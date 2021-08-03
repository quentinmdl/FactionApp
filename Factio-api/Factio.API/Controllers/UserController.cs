using System;
using System.Collections.Generic;
using System.Linq;
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
    public class UserController : ControllerBase
    {
        private IUserService _userService;


        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        //[Authorize]
        public User GetUserById(int id)
        {
            if (id == null)
                return null;

            return this._userService.GetUserById(id);
        }

        [HttpPut("{id}")]
        //[Authorize]
        public User UpdateUser(int id, User userDTO)
        {
            return this._userService.UpdateUser(id, userDTO);
        }

        [HttpPut("changePasssword/{id}")]
        //[Authorize]
        public User UpdatePasswordUser(int id, User userDTO)
        {
            return this._userService.UpdatePasswordUser(id, userDTO);
        }

        [HttpGet("ChangePassword/{token}")]
        //[Authorize]
        public RedirectResult ChangePassword(string token)
        {
            string key =  this._userService.ChangePassword(token);

            string url = "http://localhost:4200/reset-password/" + key;
            return RedirectPermanent(url);
        }

        // GET api/<UserController>/5
        [HttpGet("GetUserByToken/{token}")]
        //[Authorize]
        public User GetUserByToken(string token)
        {
            if (token == string.Empty || token == null)
                return null;

            return this._userService.GetUserByToken(token);
        }
    }
}
