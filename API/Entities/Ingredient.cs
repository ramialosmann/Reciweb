using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Ingredients")]
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int RecipesId { get; set; }
        public Recipe Recipes { get; set; }
    }
}