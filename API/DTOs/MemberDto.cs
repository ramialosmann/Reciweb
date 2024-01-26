using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public string ProfilePhotoUrl { get; set; }

        public string about { get; set; }
        public List<RecipesDto> Recipes { get; set; } 
    }
}
