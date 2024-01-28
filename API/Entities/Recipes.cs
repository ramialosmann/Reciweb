using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{


    [Table("Recipes")]
    public class Recipes
    {
        public int Id { get; set; }
        public bool isPublic { get; set; }
        public string title { get; set; }

        public List<Ingredient> ingredients { get; set; } = new();

        public string instructions { get; set; }

        public string category { get; set; }

        public List<Photo> photos { get; set; } = new();

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }

}