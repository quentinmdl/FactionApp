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
    public class BusinessController : ControllerBase
    {
        private IBusinessService _businessService;

        public BusinessController(IBusinessService businessService)
        {
            _businessService = businessService;
        }

        // GET: api/<BusinessController>
        [HttpGet]
        //[Authorize]
        public List<Business> GetAllBusinesses()
        {
            //injection de dépendances
            return this._businessService.GetAllBusinesses();
        }


        // GET: api/<BusinessController>
        [HttpGet("UserFk/{userId}")]
        //[Authorize]
        public Business GetBusinesssesByUserFk(int userId)
        {
            if (userId == null)
                return null;

            //injection de dépendances
            return this._businessService.GetBusinessesByUserFk(userId);
        }


        // GET api/<Business>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Business GetBusinessById(int id)
        {
            if (id == null)
                return null;

            return this._businessService.GetBusinessById(id);
        }


        // POST api/<BusinessController>
        [HttpPost("Add")]
        //[Authorize]
        public Business InsertBusiness(Business businessDTO)
        {
            return this._businessService.InsertBusiness(businessDTO);
        }

        // PUT api/<BusinessController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Business UpdateBusiness(int id, Business businessDTO)
        {
            return this._businessService.UpdateBusiness(id, businessDTO);
        }

    }
}
