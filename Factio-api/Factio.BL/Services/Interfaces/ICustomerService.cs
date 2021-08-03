using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface ICustomerService
    {
        Customer GetCustomerById(int customerId);
        List<Customer> GetAllCustomers();
        List<Customer> GetCustomersByUserFk(int userId);
        List<Customer> GetCustomerByUserFkDate(int userId, string date);
        bool DeleteCustomer(int customerId);
        Customer InsertCustomer(Customer customer);
        Customer UpdateCustomer(int customerId, Customer customer);
    }
}