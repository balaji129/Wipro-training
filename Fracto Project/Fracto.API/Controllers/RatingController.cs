using Fracto.Data;
using Fracto.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RatingController(ApplicationDbContext context) => _context = context;


    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Rate([FromBody] RatingCreateDto dto)
    {
        if (dto is null)
            return BadRequest(new { message = "Request body cannot be null." });

        if (dto.Value < 1 || dto.Value > 5)
            return BadRequest(new { message = "Rating must be between 1 and 5." });

        var doctor = await _context.Doctors.FindAsync(dto.DoctorId);
        if (doctor is null)
            return NotFound(new { message = "Doctor not found." });

        var rating = new Rating
        {
            DoctorId = dto.DoctorId,
            UserId = dto.UserId,
            Value = dto.Value
        };

        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();

        doctor.Rating = await _context.Ratings
            .Where(r => r.DoctorId == dto.DoctorId)
            .AverageAsync(r => r.Value);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Rated successfully",
            ratingId = rating.RatingId,
            average = doctor.Rating
        });
    }

    [Authorize]
    [HttpGet("doctor/{doctorId:int}")]
    public async Task<IActionResult> GetRatingsForDoctor(int doctorId)
    {
        var doctor = await _context.Doctors
            .AsNoTracking()
            .Include(d => d.Specialization) // optional if you want specialization info
            .FirstOrDefaultAsync(d => d.DoctorId == doctorId);

        if (doctor is null)
            return NotFound(new { message = "Doctor not found." });

        var ratings = await _context.Ratings
            .AsNoTracking()
            .Include(r => r.User)
            .Where(r => r.DoctorId == doctorId)
            .ToListAsync();

        if (!ratings.Any())
            return Ok(new
            {
                doctorId,
                doctorName = doctor.Name,
                average = 0.0,
                ratings = Array.Empty<object>()
            });

        var average = ratings.Average(r => r.Value);

        return Ok(new
        {
            doctorId,
            doctorName = doctor.Name,
            average,
            ratings = ratings.Select(r => new
            {
                r.RatingId,
                r.UserId,
                r.Value,
                userName = r.User?.Username ?? "Unknown"
            })
        });
    }
}
