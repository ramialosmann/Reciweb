using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Recipes, RecipesDto>();
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}
