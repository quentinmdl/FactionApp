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
    public class CustomerService : ICustomerService
    {
        protected readonly FactioContext _factioContext;       

        public CustomerService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }

        public bool DeleteCustomer(int customerId)
        {
            try
            {
                Customer customer = _factioContext.Customers.FirstOrDefault(x => x.Id == customerId);
                _factioContext.Customers.Remove(customer);
                _factioContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }

            return true;
        }

        public List<Customer> GetAllCustomers()
        {
            return this._factioContext.Customers.ToList();
        }


        public List<Customer> GetCustomersByUserFk(int userId)
        {
            return this._factioContext.Customers.Where(c => c.UserFK == userId).ToList();
        }


        public List<Customer> GetCustomerByUserFkDate(int userId, string date)
        {
            return this._factioContext.Customers.Where(c => c.UserFK == userId && c.AddDate.Substring(0, 6) == date).ToList();
        }


        public Customer GetCustomerById(int customerId)
        {
            try
            {
                Customer customer = _factioContext.Customers
                    .FirstOrDefault(x => x.Id == customerId);
                    return customer;
                
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Customer InsertCustomer(Customer customer)
        {
            try
            {
                if (this._factioContext.Customers.Any(x => x.Email == customer.Email))
                    throw new Exception("L'Email \"" + customer.Email + "\" existe déjà");

                if (this._factioContext.Customers.Any(x => x.PhoneNumber == customer.PhoneNumber))
                    throw new Exception("Le téléphone \"" + customer.PhoneNumber + "\" existe déjà");

                _factioContext.Customers.Add(customer);
                _factioContext.SaveChanges();
                return customer;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Customer UpdateCustomer(int customerId, Customer customer)
        {
            try
            {
                Customer oldCustomer = _factioContext.Customers.FirstOrDefault(x => x.Id == customerId);

                //if (this._factioContext.Customers.Any(x => x.Email == customer.Email))
                //    throw new Exception("L'Email \"" + customer.Email + "\" existe déjà");

                //if (this._factioContext.Customers.Any(x => x.PhoneNumber == customer.PhoneNumber))
                //    throw new Exception("Le téléphone \"" + customer.PhoneNumber + "\" existe déjà");


                oldCustomer.FirstName = customer.FirstName;
                oldCustomer.LastName = customer.LastName;
                oldCustomer.PhoneNumber = customer.PhoneNumber;
                oldCustomer.Email = customer.Email;
                oldCustomer.Logo = customer.Logo;
                oldCustomer.Address = customer.Address;
                oldCustomer.City = customer.City;
                oldCustomer.Zip = customer.Zip;
                oldCustomer.BusinessSector = customer.BusinessSector;

                _factioContext.SaveChanges();
                return customer;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }

}