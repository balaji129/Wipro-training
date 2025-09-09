using Fracto.Data;
using Fracto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DoctorController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetDoctors(
            string? city,
            int? specializationId,
            double? minRating)
        {
            var query = _context.Doctors
                .Include(d => d.Specialization)
                .Include(d => d.Images)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(city))
                query = query.Where(d => d.City.Contains(city));

            if (specializationId.HasValue)
                query = query.Where(d => d.SpecializationId == specializationId.Value);

            if (minRating.HasValue)
                query = query.Where(d => d.Rating >= minRating.Value);

            var doctors = await query
                .Select(d => new DoctorDto
                {
                    DoctorId = d.DoctorId,
                    Name = d.Name,
                    City = d.City,
                    Rating = d.Rating,
                    SpecializationName = d.Specialization != null
                        ? d.Specialization.SpecializationName
                        : "Unknown",
                    ImageUrls = d.Images.Select(img => img.ImagesUrl).ToList()
                })
                .ToListAsync();

            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.Specialization)
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.DoctorId == id);

            if (doctor == null) return NotFound();

            var dto = new DoctorDto
            {
                DoctorId = doctor.DoctorId,
                Name = doctor.Name,
                City = doctor.City,
                Rating = doctor.Rating,
                SpecializationName = doctor.Specialization != null
                    ? doctor.Specialization.SpecializationName
                    : "Unknown",
                ImageUrls = doctor.Images.Select(i => i.ImagesUrl).ToList()
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor([FromBody] DoctorDto dto)
        {
            var doctor = new Doctor
            {
                Name = dto.Name,
                City = dto.City,
                Rating = dto.Rating,
                SpecializationId = _context.Specializations
                                            .Where(s => s.SpecializationName == dto.SpecializationName)
                                            .Select(s => s.SpecializationId)
                                            .FirstOrDefault()
            };

            foreach (var url in dto.ImageUrls)
            {
                doctor.Images.Add(new DoctorImage { ImagesUrl = url });
            }

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.DoctorId }, doctor.DoctorId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] DoctorDto dto)
        {
            var doctor = await _context.Doctors.Include(d => d.Images).FirstOrDefaultAsync(d => d.DoctorId == id);
            if (doctor == null) return NotFound();

            doctor.Name = dto.Name;
            doctor.City = dto.City;
            doctor.Rating = dto.Rating;

            doctor.Images.Clear();
            foreach (var url in dto.ImageUrls)
            {
                doctor.Images.Add(new DoctorImage { ImagesUrl = url });
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
