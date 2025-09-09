namespace Fracto.Models;
public class Rating
{
    public int RatingId { get; set; }
    public int DoctorId { get; set; }
    public int UserId { get; set; }
    public int Value { get; set; } // 1..5
    public Doctor? Doctor { get; set; }
    public User? User { get; set; }
}