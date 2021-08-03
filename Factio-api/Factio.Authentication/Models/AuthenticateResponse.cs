using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.Authentication
{
    public class AuthenticateResponse
    {
		public string Token { get; set; }
		public User Infos { get; set; }

		public AuthenticateResponse(User user, string token)
		{
			Infos = user;
			Token = token;
		}
	}
}
