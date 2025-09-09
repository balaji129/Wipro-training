namespace Fracto.Models;
public class Specialization
{
    public int SpecializationId { get; set; }
    public string SpecializationName { get; set; } = string.Empty;
    public ICollection<Doctor>? Doctors { get; set; }
}