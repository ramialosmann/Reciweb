namespace API.Entities
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int RecipesId { get; set; }
        public Recipes Recipes { get; set; }
    }
}