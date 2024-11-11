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

        // New GET method for a specific Fond by Sifra
        [HttpGet("{sifra}")]
        public IActionResult Get(int sifra)
        {
            var fond = _context.Fond.FirstOrDefault(f => f.Sifra == sifra);
            if (fond == null)
            {
                return NotFound(new { greska = true, poruka = "Fond nije pronađen" });
            }
            return Ok(fond);
        }

        [HttpPost]
        public IActionResult Post(Fond fond)
        {
            _context.Fond.Add(fond);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, fond);
        }

        [HttpPut]
        public IActionResult Put(Fond fond)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { greska = true, poruka = "Nije ispravan unos" });
            }

           
            var existingFond = _context.Fond.FirstOrDefault(f => f.Sifra == fond.Sifra);
            if (existingFond == null)
            {
                return NotFound(new { greska = true, poruka = "Fond nije pronađen" });
            }

            
            existingFond.Naziv = fond.Naziv;
            existingFond.IznosSredstava = fond.IznosSredstava;
            existingFond.BrojProjekata = fond.BrojProjekata;
            existingFond.UProvedbiDo = fond.UProvedbiDo;

           
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status200OK, existingFond);
        }
        [HttpDelete("{sifra}")]
        public IActionResult Delete(int sifra)
        {
           
            var existingFond = _context.Fond.FirstOrDefault(f => f.Sifra == sifra);
            if (existingFond == null)
            {
                return NotFound(new { greska = true, poruka = "Fond nije pronađen" });
            }

         
            _context.Fond.Remove(existingFond);

           
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status204NoContent); 
        }

    }

}
