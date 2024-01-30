using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [HttpPut]
        public async Task<ActionResult> UpdateRecipe(RecipeUpdateDto updateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userrepo.GetByUsernameAsync(username);

            if (user==null)
            {
                return NotFound();
            }
            var recipe = await _context.Recipes.SingleOrDefaultAsync(
                 r => r.title==updateDto.title);
            var userrecipe = user.Recipes.FirstOrDefault(t => t.title==updateDto.title);
            if(recipe==null)
            {
                return NotFound();
            }
            if(recipe != null && userrecipe == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto , recipe);

            if (await _recipeService.SaveAllAsync()) { return NoContent(); }

            return BadRequest("Failed to update profile");
        }
    }
}
