namespace Fracto.Models;

public class UserDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "User";

     public List<AppointmentDto>? Appointments { get; set; }
}

public class DoctorDto
{
    public int DoctorId { get; set; }
    public string Name { get; set; } = null!;
    public string City { get; set; } = null!;
    public double Rating { get; set; }

    public string SpecializationName { get; set; } = null!;
public List<string> ImageUrls { get; set; } = new();
}

public class DoctorCreateDto
{
    public string Name { get; set; } = null!;
    public string City { get; set; } = null!;
    public double Rating { get; set; }
    public int SpecializationId { get; set; }
}

public class AppointmentDto
    {
        public int AppointmentId { get; set; }
        public DateTime AppointmentDate { get; set; }
    public string TimeSlot { get; set; } = null!;
        public string Status { get; set; }  = null!;
        public string Username { get; set; }    = null!;
        public string? DoctorName { get; set; }  
        public string? Specialization { get; set; }  
        public string? City { get; set; }    
    }

    public class RatingCreateDto
    {
        public int DoctorId { get; set; }
        public int UserId { get; set; }
        public int Value { get; set; } // e.g., 1 to 5
    }

public class UserResponseDto
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}
public class UserRegisterDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}

public class UserLoginDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class AppointmentStatusDto
{
    public string Status { get; set; } = string.Empty;
}

