using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipesDto>> GetRecipesAsync();
        Task<bool> SaveAllAsync( );
        void Update(Recipe recipe);
    }
}
