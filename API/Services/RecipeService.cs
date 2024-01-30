using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RecipeService(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }
        public async Task<IEnumerable<RecipesDto>> GetRecipesAsync( )
        {
            return await _context.Recipes.Include(i => i.ingredients)
                         .Include(p => p.photos)
                         .ProjectTo<RecipesDto>(_mapper.ConfigurationProvider)
                         .ToListAsync();

                
        }
    }
}
