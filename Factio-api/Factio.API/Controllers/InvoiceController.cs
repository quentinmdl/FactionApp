using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Factio.BL;
using Factio.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Factio.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        // GET: api/<InvoiceController>
        [HttpGet]
        //[Authorize]
        public List<Invoice> GetAllInvoices()
        {
            //injection de dépendances
            return this._invoiceService.GetAllInvoices();
        }


        // GET: api/<InvoiceController>
        [HttpGet("UserFk/{userId}")]
        //[Authorize]
        public List<Invoice> GetInvoicesByUserFk(int userId)
        {
            //injection de dépendances
            return this._invoiceService.GetInvoicesByUserFk(userId);
        }


        // GET api/<InvoiceController>/5
        [HttpGet("UserFk/{userId}/Date/{date}")]
        //[Authorize]
        public List<Invoice> GetInvoiceByUserFkDate(int userId, string date)
        {
            if (date == string.Empty)
                return null;

            return this._invoiceService.GetInvoiceByUserFkDate(userId, date);
        }


        // GET api/<Invoice>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Invoice GetInvoiceById(int id)
        {
            if (id == null)
                return null;

            return this._invoiceService.GetInvoiceById(id);
        }

        // GET api/<InvoiceController>/5
        [HttpGet("Lastname/{lastname}")]
        //[Authorize]
        public Invoice GetInvoiceByLastname(string lastname)
        {
            if (lastname == string.Empty)
                return null;

            return this._invoiceService.GetInvoiceByLastname(lastname);
        }


        // POST api/<InvoiceController>
        [HttpPost("Add")]
        //[Authorize]
        public Invoice InsertInvoice(Invoice invoiceDTO)
        {
            return this._invoiceService.InsertInvoice(invoiceDTO);
        }

        // PUT api/<InvoiceController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Invoice UpdateInvoice(int id, Invoice invoiceDTO)
        {
            return this._invoiceService.UpdateInvoice(id, invoiceDTO);
        }

        // DELETE api/<InvoiceController>/5
        [HttpDelete("{id}")]
        //[Authorize]
        public bool DeleteInvoice(int id)
        {
            if (id == null)
                return false;

            return this._invoiceService.DeleteInvoice(id);
        }

    }
}
