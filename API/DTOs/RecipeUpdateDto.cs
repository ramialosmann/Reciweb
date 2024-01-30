namespace API.DTOs
{
    public class RecipeUpdateDto
    {
        public bool isPublic { get; set; }
        public string title { get; set; }
        public string MainPhotoUrl { get; set; }

        public List<IngredientDto> ingredients { get; set; }

        public string instructions { get; set; }

        public string category { get; set; }

        public List<PhotoDto> photos { get; set; }
    }
}
