using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FondChecker.Models
{
    public class Fond : Entitet
    {
        [Column("naziv")]
        public string? Naziv { get; set; }

        [Column("iznos_sredstava")]
        public decimal? IznosSredstava { get; set; }

        [Column("broj_projekata")]
        public int? BrojProjekata { get; set; }

        [Column("u_provedbi_do")]
        public DateTime? UProvedbiDo { get; set; }
    }
}
