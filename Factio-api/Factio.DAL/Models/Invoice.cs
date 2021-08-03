using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Factio.DAL
{
    public class Invoice
    {

        public int Id { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string PaymentMethod { get; set; }
        [DataType(DataType.Text)]
        public string Text { get; set; }
        [Required]
        public string AmountHt { get; set; }
        [Required]
        public string AmountTtc { get; set; }
        [Required]
        public string Benefit { get; set; }
        [Required]
        public string pdfFile { get; set; }

        [Required]
        public int UserFK { get; set; }
        public User User { get; set; }

        [Required]
        public int CustomerFK { get; set; }
        public Customer Customer { get; set; }


        //[Required]
        //[ForeignKey("InvoiceFk")]
        //public ICollection<Benefit> Benefits { get; set; }
    }
}
