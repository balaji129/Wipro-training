namespace Fracto.Models;
public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; // NOTE: plain text here for demo; hash in real apps
    public string Role { get; set; } = "User"; // "User" or "Admin"
    public ICollection<Appointment>? Appointments { get; set; }
}