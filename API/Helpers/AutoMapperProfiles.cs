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
            .ForMember(src => src.Age,
            opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Recipes, RecipesDto>()
            .ForMember(dest => dest.MainPhotoUrl, opt =>
            opt.MapFrom(src => src.photos.FirstOrDefault(x => x.isMain).Url));
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}
