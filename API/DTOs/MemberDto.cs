using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public List<RecipesDto> Recipes { get; set; } 
    }
}
