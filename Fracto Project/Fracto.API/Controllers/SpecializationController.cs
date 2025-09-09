using Fracto.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpecializationsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public SpecializationsController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var specs = _db.Specializations
            .Select(s => new {
                specializationId = s.SpecializationId,
                specializationName = s.SpecializationName
            })
            .ToList();

        return Ok(specs);
    }
}