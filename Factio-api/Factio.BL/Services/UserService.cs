using Factio.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Factio.BL
{
    public class UserService : IUserService
    {
        protected readonly FactioContext _factioContext;
        public UserService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }
      
     
        public User GetUserById(int userId)
        {
            try
            {
                User user = _factioContext.Users
                    .FirstOrDefault(x => x.Id == userId);
                    return user;            
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public User GetUserByToken(string token)
        {
            try
            {
                User user = _factioContext.Users
                    .FirstOrDefault(x => x.Token == token);

                if (user != null)
                    return user;
                else
                    return null;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public User UpdateUser(int userId, User user)
        {
            try
            {
                User oldUser = _factioContext.Users.FirstOrDefault(x => x.Id == userId);
                oldUser.Username = user.Username;
                oldUser.Password = user.Password;
                oldUser.FirstName = user.FirstName;
                oldUser.LastName = user.LastName;
                oldUser.Job = user.Job;
                oldUser.Password = user.Password;
                oldUser.ConfirmPassword = user.ConfirmPassword;
                oldUser.Photo = user.Photo;
                oldUser.Email = user.Email;
                oldUser.PhoneNumber = user.PhoneNumber;
                oldUser.Address = user.Address;
                oldUser.City = user.City;
                oldUser.Zip = user.Zip;
                oldUser.Token = user.Token;

                // validation
                //if (this._factioContext.Users.Any(x => x.Username == user.Username))
                //    throw new Exception("Le pseudo \"" + user.Username + "\" existe déjà");
                //if (this._factioContext.Users.Any(x => x.PhoneNumber == user.PhoneNumber))
                //    throw new Exception("Le téléphone \"" + user.PhoneNumber + "\" exsite déjà");
                //if (this._factioContext.Users.Any(x => x.Email == user.Email))
                //    throw new Exception("L'email \"" + user.Email + "\" existe déjà");


                _factioContext.SaveChanges();
                return user;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public User UpdatePasswordUser(int userId, User user)
        {
            try
            {
                User oldPasswordUser = _factioContext.Users.FirstOrDefault(x => x.Id == userId);

                oldPasswordUser.Password = user.Password;
                oldPasswordUser.ConfirmPassword = user.ConfirmPassword;

                _factioContext.SaveChanges();
                return user;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }

           
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

        public string ChangePassword(string token)
        {
            try
            {
                User user = _factioContext.Users.FirstOrDefault(x => x.Token == token);

                if (user == null)
                    return string.Empty;
                else
                    return user.Token;
            } catch(Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }
}
