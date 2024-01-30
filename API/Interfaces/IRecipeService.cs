using API.DTOs;

namespace API.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipesDto>> GetRecipesAsync();
    }
}
