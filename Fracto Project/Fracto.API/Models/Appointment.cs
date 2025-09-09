namespace Fracto.Models;
public class Appointment
{
    public int AppointmentId { get; set; }
    public int UserId { get; set; }
    public int DoctorId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string TimeSlot { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public User? User { get; set; }
    public Doctor? Doctor { get; set; }
}