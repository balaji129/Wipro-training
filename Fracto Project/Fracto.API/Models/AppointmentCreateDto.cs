namespace Fracto.Models
{
    public class AppointmentCreateDto
    {
        public int UserId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string TimeSlot { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
    }
}
