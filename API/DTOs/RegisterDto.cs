using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*[^A-Za-z])(?=.*[A-Z])(?=.*[a-z]).{4,}$", ErrorMessage = "Password must be over 4 Characters, a number and capital leter are required.")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
    }
}