using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface IInvoiceService
    {
        Invoice GetInvoiceById(int invoiceId);
        Invoice GetInvoiceByLastname(string lastname);
        List<Invoice> GetAllInvoices();
        List<Invoice> GetInvoicesByUserFk(int userId);
        List<Invoice> GetInvoiceByUserFkDate(int userId, string date);
        bool DeleteInvoice(int invoiceId);
        Invoice InsertInvoice(Invoice invoice);
        Invoice UpdateInvoice(int invoiceId, Invoice invoice);
    }
}