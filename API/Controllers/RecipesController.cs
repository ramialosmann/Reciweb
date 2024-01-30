using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class RecipesController : BaseApiController
    {
        private readonly IRecipeService _recipeService;
        private readonly IMapper _mapper;

        public RecipesController(IRecipeService recipeService , IMapper mapper)
        {
            _recipeService=recipeService;
            _mapper=mapper;
        }

        
        [HttpGet]

        public async Task<ActionResult<IEnumerable<RecipesDto>>> GetRecipes()
        {
            var recipes = await _recipeService.GetRecipesAsync();
            var recipestoreturn =  _mapper.Map<IEnumerable<RecipesDto>>(recipes);
            return Ok(recipestoreturn);
        }

    }
}
