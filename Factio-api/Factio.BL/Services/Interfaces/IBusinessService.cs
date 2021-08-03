using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface IBusinessService
    {
        Business GetBusinessById(int businessId);
        List<Business> GetAllBusinesses();
        Business GetBusinessesByUserFk(int userId);
        Business InsertBusiness(Business business);
        Business UpdateBusiness(int businessId, Business business);

    }
}