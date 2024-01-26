namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[ ] PasswordSalt { get; set; }

        public string ProfilePhotoUrl { get; set; }

        public string about { get; set; }

        public List<Recipes> Recipes { get; set; } = new();


    }
}
