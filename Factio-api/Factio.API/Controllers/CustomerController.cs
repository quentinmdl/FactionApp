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
    public class CustomerController : ControllerBase
    {
        private ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        //[Authorize]
        public List<Customer> GetAllCustomers()
        {
            //injection de dépendances
            return this._customerService.GetAllCustomers();
        }


        // GET: api/<CustomerController>
        [HttpGet("UserFk/{userId}")]
        //[Authorize]
        public List<Customer> GetCustomersByUserFk(int userId)
        {
            //injection de dépendances
            return this._customerService.GetCustomersByUserFk(userId);
        }


        // GET api/<CustomerController>/5/Date/202106
        [HttpGet("UserFk/{userId}/Date/{date}")]
        //[Authorize]
        public List<Customer> GetCustomerByUserFkDate(int userId, string date)
        {
            if (date == string.Empty)
                return null;

            return this._customerService.GetCustomerByUserFkDate(userId, date);
        }


        // GET api/<Customer>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Customer GetCustomerById(int id)
        {
            if (id == null)
                return null;

            return this._customerService.GetCustomerById(id);
        }


        // POST api/<CustomerController>
        [HttpPost("Add")]
        //[Authorize]
        public Customer InsertCustomer(Customer customerDTO)
        {
            return this._customerService.InsertCustomer(customerDTO);
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Customer UpdateCustomer(int id, Customer customerDTO)
        {
            return this._customerService.UpdateCustomer(id, customerDTO);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        //[Authorize]
        public bool DeleteCustomer(int id)
        {
            if (id == null)
                return false;

            return this._customerService.DeleteCustomer(id);
        }

    }
}
