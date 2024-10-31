using FondChecker.Data;
using FondChecker.Models;
using Microsoft.AspNetCore.Mvc;

namespace FondChecker.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FondController : ControllerBase
    {

        private readonly FondContext _context;

        public FondController(FondContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Fond);
        }

        [HttpPost]
        public IActionResult Post(Fond fond)
        {
            _context.Fond.Add(fond);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, fond);
        }
    }
}
