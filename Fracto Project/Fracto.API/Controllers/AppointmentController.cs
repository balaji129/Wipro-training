using Fracto.Data;
using Fracto.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public AppointmentController(ApplicationDbContext context) => _context = context;

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Book([FromBody] AppointmentCreateDto dto)
    {
        if (dto == null || dto.UserId <= 0 || dto.DoctorId <= 0)
            return BadRequest(new { message = "Invalid appointment request" });

        var appointment = new Appointment
        {
            UserId = dto.UserId,
            DoctorId = dto.DoctorId,
            AppointmentDate = dto.AppointmentDate,
            TimeSlot = dto.TimeSlot,
            Status = string.IsNullOrWhiteSpace(dto.Status) ? "Pending" : dto.Status
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Appointment Created",
            appointmentId = appointment.AppointmentId,
            status = appointment.Status
        });
    }

    [Authorize]
    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetByUser(int userId)
    {
        var list = await _context.Appointments
            .Include(a => a.User)
            .Include(a => a.Doctor!)
                .ThenInclude(d => d.Specialization)
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.AppointmentDate)
            .Select(a => new AppointmentDto
            {
                AppointmentId = a.AppointmentId,
                AppointmentDate = a.AppointmentDate,
                TimeSlot = a.TimeSlot,
                Status = a.Status,
                Username = a.User != null ? a.User.Username : "Unknown",
                DoctorName = a.Doctor != null ? a.Doctor.Name : "Unknown",
                Specialization = a.Doctor != null && a.Doctor.Specialization != null
                                    ? a.Doctor.Specialization.SpecializationName
                                    : "General",
                City = a.Doctor != null ? a.Doctor.City : "Not specified"
            })
            .ToListAsync();

        return Ok(list);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var appt = await _context.Appointments.FindAsync(id);
        if (appt is null) return NotFound(new { message = "Appointment not found" });

        appt.Status = "Cancelled";
        await _context.SaveChangesAsync();

        return Ok(new { message = "Appointment Cancelled", status = appt.Status });
    }

    [Authorize]
    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var appt = await _context.Appointments.FindAsync(id);
        if (appt is null) return NotFound(new { message = "Appointment not found" });

        appt.Status = status;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Status Updated", appointmentId = appt.AppointmentId, status = appt.Status });
    }
}
