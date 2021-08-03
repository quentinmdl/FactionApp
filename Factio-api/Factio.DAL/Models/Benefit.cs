using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Factio.DAL
{
    public class Benefit
    {
        public int Id { get; set; }
        [Required]
        public string Product { get; set; }
        [Required]
        public string Price { get; set; }
        [Required]
        public int Quantiy { get; set; }
        [Required]
        public string TotalPriceHt { get; set; }

        //[Required]
        //public int InvoiceFK { get; set; }
        //public Invoice Invoice { get; set; }

    }
}
