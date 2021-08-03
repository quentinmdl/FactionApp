using AutoMapper;
using Factio.BL;
using Factio.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Factio.Authentication
{
    public class AuthService : IAuthService
    {
        protected readonly FactioContext _factioContext;

        private readonly AppSettings _appSettings;
        private IMapper _mapper;

        public AuthService(IOptions<AppSettings> appSettings, FactioContext dbContext, IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _factioContext = dbContext;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return null;

            var user = this._factioContext.Users
                .SingleOrDefault(x => x.Email == model.Email || x.Username == model.Email);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            string passwordHash = sha256_hash(model.Password);

            if (passwordHash != user.Password)
                return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);
            _factioContext.Users.FirstOrDefault(x => x.Username == model.Email).Token = token;
            _factioContext.SaveChanges();

            user.Password = null;
            return new AuthenticateResponse(user, token);
        }


        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Un mot de passe est requis");

            if (this._factioContext.Users.Any(x => x.Username == user.Username))
                throw new Exception("Le pseudo \"" + user.Username + "\" existe déjà");
            if (this._factioContext.Users.Any(x => x.PhoneNumber == user.PhoneNumber))
                throw new Exception("Le téléphone \"" + user.PhoneNumber + "\" exsite déjà");
            if (this._factioContext.Users.Any(x => x.Email == user.Email))
                throw new Exception("L'email \"" + user.Email + "\" existe déjà");

            string passwordHash = sha256_hash(password);

            user.Password = passwordHash;

            this._factioContext.Users.Add(user);
            this._factioContext.SaveChanges();
            user.Password = null;
            return user;
        }

        //privates methods
        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static String sha256_hash(string value)
        {
            StringBuilder Sb = new StringBuilder();

            using (var hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public bool ResetPassword(ResetPasswordModel model)
        {
            if (model.Password != model.ConfirmationPassword)
                throw new Exception("Les mot de passe sont différents.");

            User user = _factioContext.Users.FirstOrDefault(x => x.Id == model.Id);

            if (user == null)
                throw new Exception("Invalid token");

            // update password and remove reset token
            user.Password = sha256_hash(model.Password);
            user.Token = null;

            _factioContext.Users.Update(user);
            _factioContext.SaveChanges();
            return true;
        }

        public bool SendPasswordResetEmail(ResetPasswordRequest reset)
        {
            throw new NotImplementedException();
        }

    }
}
