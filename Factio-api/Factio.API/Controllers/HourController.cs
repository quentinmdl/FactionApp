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
    public class HourController : ControllerBase
    {
        private IHourService _hourService;

        public HourController(IHourService hourService)
        {
            _hourService = hourService;
        }


        // GET api/<Hour>/5
        [HttpGet("{id}")]
        //[Authorize]
        public Hour GetHourById(int id)
        {
            if (id == null)
                return null;

            return this._hourService.GetHourById(id);
        }


        // GET: api/HourController>
        [HttpGet("UserFk/{userId}")]
        //[Authorize]
        public List<Hour> GetHoursByUserFk(int userId)
        {
            //injection de dépendances
            return this._hourService.GetHoursByUserFk(userId);
        }


        // POST api/<HourController>
        [HttpPost("Add")]
        //[Authorize]
        public Hour InsertHour(Hour hourDTO)
        {
            return this._hourService.InsertHour(hourDTO);
        }

        // PUT api/<HourController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public Hour UpdateHour(int id, Hour hourDTO)
        {
            return this._hourService.UpdateHour(id, hourDTO);
        }

    }
}
