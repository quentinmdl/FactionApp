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
    public class BenefitController : ControllerBase
    {
        private IBenefitService _benefitService;

        public BenefitController(IBenefitService benefitService)
        {
            _benefitService = benefitService;
        }

        // GET: api/<BenefitController>
        [HttpGet]
        //[Authorize]
        public List<Benefit> GetAllBenefits()
        {
            //injection de dépendances
            return this._benefitService.GetAllBenefits();
        }


        // GET: api/<BenefitController>
        [HttpGet("InvoiceFk/{invoiceId}")]
        //[Authorize]
        public List<Benefit> GetInvoicesByInvoiceFk(int invoiceId)
        {
            //injection de dépendances
            return this._benefitService.GetBenefitsByInvoiceFk(invoiceId);
        }


        // GET api/<Benefit>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Benefit GetBenefitById(int id)
        {
            if (id == null)
                return null;

            return this._benefitService.GetBenefitById(id);
        }


        // POST api/<BenefitController>
        [HttpPost("Add")]
        //[Authorize]
        public Benefit InsertBenefit(Benefit benefitDTO)
        {
            return this._benefitService.InsertBenefit(benefitDTO);
        }

        // PUT api/<BenefitController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Benefit UpdateBenefit(int id, Benefit benefitDTO)
        {
            return this._benefitService.UpdateBenefit(id, benefitDTO);
        }

        // DELETE api/<BenefitController>/5
        [HttpDelete("{id}")]
        //[Authorize]
        public bool DeleteBenefit(int id)
        {
            if (id == null)
                return false;

            return this._benefitService.DeleteBenefit(id);
        }

    }
}
