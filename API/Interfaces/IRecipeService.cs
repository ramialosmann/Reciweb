using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipesDto>> GetRecipesAsync();
        Task<Recipe> GetRecipeAsync (AppUser user , string title);
        Task<bool> SaveAllAsync( );
        void Update(Recipe recipe);
        
        void Delete(Recipe recipe);
    }
}
