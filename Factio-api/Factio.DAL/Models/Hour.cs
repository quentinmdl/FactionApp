using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Factio.DAL
{
    public class Hour
    {
        public int Id { get; set; }
        [Required]
        [DefaultValue(0)]
        public int week1 { get; set; }
        [Required]
        [DefaultValue(0)]
        public int week2 { get; set; }
        [Required]
        [DefaultValue(0)]
        public int week3 { get; set; }
        [Required]
        [DefaultValue(0)]
        public int week4 { get; set; }
        [Required]
        [DefaultValue(0)]
        public int week5 { get; set; }

        [Required]
        public int UserFK { get; set; }
        public User User { get; set; }

    }
}
