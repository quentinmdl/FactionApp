using AutoMapper;
using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.Authentication
{
    public class Profile : AutoMapper.Profile
    {
        public Profile()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<RegisterRequest, User>();
                cfg.CreateMap<User, RegisterRequest>();
            });
        }
    }
}
