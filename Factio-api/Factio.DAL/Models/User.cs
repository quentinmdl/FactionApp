using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Factio.DAL
{
    public class User
    {
        public static object Claims { get; set; }
        public int Id { get; set; }
        [StringLength(30, ErrorMessage = "Username must be at least 3 characters long.", MinimumLength = 3)]
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [NotMapped]
        [CompareAttribute("Password", ErrorMessage = "Passwords doesn't match")]
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [StringLength(10, ErrorMessage = "Please enter a valid number", MinimumLength = 10)]
        [DataType(DataType.PhoneNumber)]
        [Required]
        public string PhoneNumber { get; set; }
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }
        public string Photo { get; set; }
        [Required]
        public string Job { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [DataType(DataType.PostalCode)]
        [Required]
        public int Zip { get; set; }
        public string Token { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<Customer> Customers { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<Note> Notes { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<Invoice> Invoices { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<Business> Businesses { get; set; }

        [ForeignKey("UserFK")]
        public ICollection<Hour> Hours { get; set; }

    }
}
