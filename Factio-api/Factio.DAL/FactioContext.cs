using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Factio.DAL
{
    public class FactioContext : DbContext
    {
        public FactioContext(DbContextOptions<FactioContext> options)
          : base(options)
        {

        }

        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
        #endregion

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Note> Notes { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Benefit> Benefits { get; set; }
        public virtual DbSet<Business> Businesses { get; set; }
        public virtual DbSet<Hour> Hours { get; set; }

    }
}
