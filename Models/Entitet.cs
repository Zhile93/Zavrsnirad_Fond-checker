using System.ComponentModel.DataAnnotations;

namespace FondChecker.Models
{
    public abstract class Entitet
    {
        [Key] 
        public int Sifra { get; set; }
    }
}
