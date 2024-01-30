using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.Age,
            opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Recipe, RecipesDto>()
            .ForMember(dest => dest.MainPhotoUrl, opt =>
            opt.MapFrom(src => src.photos.FirstOrDefault(x => x.isMain).Url));
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberProfileUpdateDto, AppUser>();
            CreateMap<RecipeUpdateDto, Recipe>();
            CreateMap<IngredientDto, Ingredient>();
            CreateMap<PhotoDto, Photo>();
        }
    }
}
