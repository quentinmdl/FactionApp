using Factio.DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Factio.BL
{
    public class BusinessService : IBusinessService
    {
        protected readonly FactioContext _factioContext;

        public BusinessService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }


        public List<Business> GetAllBusinesses()
        {
            return this._factioContext.Businesses.ToList();
        }


        public Business GetBusinessesByUserFk(int userId)
        {
            try
            {
                Business business = _factioContext.Businesses
                    .FirstOrDefault(x => x.UserFK ==  userId);

                if (business != null)
                    return business;
                else
                    return null;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Business GetBusinessById(int businessId)
        {
            try
            {
                Business business = _factioContext.Businesses
                    .FirstOrDefault(x => x.Id == businessId);
                return business;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Business InsertBusiness(Business business)
        {
            try
            {
                if (this._factioContext.Businesses.Any(x => x.Siret == business.Siret))
                    throw new Exception("Le numéro de Siret \"" + business.Siret + "\" existe déjà");

                _factioContext.Businesses.Add(business);
                _factioContext.SaveChanges();
                return business;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Business UpdateBusiness(int businessId, Business business)
        {
            try
            {
                Business oldBusiness = _factioContext.Businesses.FirstOrDefault(x => x.Id == businessId);

                //if (this._factioContext.Customers.Any(x => x.Email == customer.Email))
                //    throw new Exception("L'Email \"" + customer.Email + "\" existe déjà");

                //if (this._factioContext.Customers.Any(x => x.PhoneNumber == customer.PhoneNumber))
                //    throw new Exception("Le téléphone \"" + customer.PhoneNumber + "\" existe déjà");


                oldBusiness.Tva = business.Tva;
                oldBusiness.Urssaf = business.Urssaf;
                oldBusiness.Taxe = business.Taxe;
                oldBusiness.Siret = business.Siret;
                oldBusiness.Ape = business.Ape;


                _factioContext.SaveChanges();
                return business;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }
}
