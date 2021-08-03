using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Factio.DAL
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [StringLength(10, ErrorMessage = "Please enter a valid number", MinimumLength = 10)]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string Logo{ get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        [DataType(DataType.PostalCode)]
        public int Zip { get; set; }
        [Required]
        public string BusinessSector { get; set; }
        [Required]
        public string AddDate { get; set; }

        [Required]
        public int UserFK { get; set; }
        public User User { get; set; }

        [ForeignKey("CustomerFK")]
        public ICollection<Invoice> Invoices { get; set; }
    }
}
