using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string username {  get; set; }

        [Required]
        public string password { get; set; }

        [Required, Compare("password")]

        public string confirmpassword { get; set; }
    }
}
