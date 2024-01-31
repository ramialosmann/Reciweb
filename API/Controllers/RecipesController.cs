using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Security.Claims;

namespace API.Controllers
{
   
    public class RecipesController : BaseApiController
    {
        private readonly IRecipeService _recipeService;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userrepo;
        private readonly DataContext _context;

        public RecipesController(IRecipeService recipeService , IMapper mapper
                                 , IUserRepository userrepo, DataContext context)
        {
            _recipeService=recipeService;
            _mapper=mapper;
            _userrepo=userrepo;
            _context=context;
        }

        
        [HttpGet]

        public async Task<ActionResult<IEnumerable<RecipesDto>>> GetRecipes()
        {
            var recipes = await _recipeService.GetRecipesAsync();
            var recipestoreturn =  _mapper.Map<IEnumerable<RecipesDto>>(recipes);
            return Ok(recipestoreturn);
        }

        [Authorize]
        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteRecipe(int id )
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userrepo.GetByUsernameAsync(username);
            var recipe = await _context.Recipes.SingleOrDefaultAsync(r => r.Id == id);
            if (recipe == null) { return NotFound(); }
            if (user.Recipes.FirstOrDefault(r => r.Id == id) == null)
            {
                return NotFound();
            }
            _recipeService.Delete(recipe);
            if (await _recipeService.SaveAllAsync()) { return NoContent(); }

            return BadRequest("Failed to delete recipe");
        }

        [HttpPut]

        public async Task<ActionResult> EditRecipe(RecipeUpdateDto recipeUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userrepo.GetByUsernameAsync(username);
            var recipe = await _recipeService.GetRecipeAsync(user, recipeUpdateDto.title);
            if (recipe==null)
            {
                return NotFound("Recipe null");
            }
            _mapper.Map(recipeUpdateDto, recipe);

            if (await _recipeService.SaveAllAsync()) { return NoContent(); };

            return BadRequest("Failed to update recipe");

        }

  
    }
}
