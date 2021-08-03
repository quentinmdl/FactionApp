using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.Authentication
{
    public class ResetPasswordModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmationPassword { get; set; }
    }
}
