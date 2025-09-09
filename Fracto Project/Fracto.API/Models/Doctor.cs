using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Fracto.Models;

public class Doctor
{
    public int DoctorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int SpecializationId { get; set; }
    public string City { get; set; } = string.Empty;
    public double Rating { get; set; } = 0.0;

    [JsonIgnore]
    public Specialization? Specialization { get; set; }

     public ICollection<DoctorImage> Images { get; set; } = new List<DoctorImage>();
}

    public class DoctorImage
    {
        [Key]
        public int Id { get; set; }
        public string ImagesUrl { get; set; } = string.Empty;

        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } = null!;
    }
