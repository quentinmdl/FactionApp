using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.Authentication
{
    public interface IAuthService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        User Create(User user, string password);
        bool SendPasswordResetEmail(ResetPasswordRequest reset);
        bool ResetPassword(ResetPasswordModel model);
    }
}
