using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Recipes")]
    public class Recipes
    {
        public int Id { get; set; }
        public string title { get; set; }

        public string ingredients { get; set; }

        public string instructions { get; set; }

        public string category { get; set; }

        public List<Photo> photos { get; set; }

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}