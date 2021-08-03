using Factio.DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Factio.BL
{
    public class InvoiceService : IInvoiceService
    {
        protected readonly FactioContext _factioContext;

        public InvoiceService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }

        public bool DeleteInvoice(int invoiceId)
        {
            try
            {
                Invoice invoice = _factioContext.Invoices.FirstOrDefault(x => x.Id == invoiceId);
                _factioContext.Invoices.Remove(invoice);
                _factioContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }

            return true;
        }

        public List<Invoice> GetAllInvoices()
        {
            return this._factioContext.Invoices.ToList();
        }


        public List<Invoice> GetInvoicesByUserFk(int userId)
        {
            return this._factioContext.Invoices.Where(c => c.UserFK == userId).ToList();
        }


        public List<Invoice> GetInvoiceByUserFkDate(int userId, string date)
        {
            return this._factioContext.Invoices.Where(c => c.UserFK == userId && c.Number.Substring(0, 6) == date).ToList();
        }


        public Invoice GetInvoiceById(int invoiceId)
        {
            try
            {
                Invoice invoice = _factioContext.Invoices
                    .FirstOrDefault(x => x.Id == invoiceId);
                return invoice;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Invoice GetInvoiceByLastname(string lastname)
        {
            try
            {
                Invoice invoice = _factioContext.Invoices.FirstOrDefault(x => x.Customer.LastName == lastname);
                return invoice;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Invoice InsertInvoice(Invoice invoice)
        {
            try
            {
                _factioContext.Invoices.Add(invoice);
                _factioContext.SaveChanges();
                return invoice;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Invoice UpdateInvoice(int invoiceId, Invoice invoice)
        {
            try
            {
                Invoice oldInvoice = _factioContext.Invoices.FirstOrDefault(x => x.Id == invoiceId);

                oldInvoice.PaymentMethod = invoice.PaymentMethod;
                oldInvoice.Text = invoice.Text;
   
                _factioContext.SaveChanges();
                return invoice;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }

}