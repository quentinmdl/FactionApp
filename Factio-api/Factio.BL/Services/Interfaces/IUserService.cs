using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface IUserService
    {
        User GetUserById(int userId);
        User GetUserByToken(string token);
        User UpdateUser(int userId, User user);
        User UpdatePasswordUser(int userId, User user);
        string ChangePassword(string token);
    }
}
