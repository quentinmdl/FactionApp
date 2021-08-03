using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Factio.DAL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Factio.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IAuthService _authService;
        private IMapper _mapper;
        //private readonly IEmailSender _emailSender;

        public UserController(IAuthService authService,IMapper mapper) //UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender
        {
            _authService = authService;
            _mapper = mapper;
            //_userManager = userManager;
            //_signInManager = signInManager;
            //_emailSender = emailSender;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(User model)
        {

            var user = _mapper.Map<User>(model);
            try
            {
                // create user
                _authService.Create(user, model.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }

        }


        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public bool ResetPassword(ResetPasswordModel user)
        {
            return _authService.ResetPassword(user);
        }

        [AllowAnonymous]
        [HttpPost("ForgetPassword")]
        public bool ForgetPassword(ResetPasswordRequest reset)
        {
            return _authService.SendPasswordResetEmail(reset);
        }

       
    }
}
