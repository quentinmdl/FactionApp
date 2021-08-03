using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Factio.DAL
{
    public class Business
    {
        public int Id { get; set; }
        [Required]
        public int Tva { get; set; }
        public string Urssaf { get; set; }
        public string Taxe { get; set; }
        [Required]
        public string Siret { get; set; }
        [Required]
        public string Ape { get; set; }
        //[Required]
        //public string CA { get; set; }

        [Required]
        public int UserFK { get; set; }
        public User User { get; set; }

    }
}
