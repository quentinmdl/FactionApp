using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface IHourService
    {
        Hour GetHourById(int hourId);
        List<Hour> GetHoursByUserFk(int userId);
        Hour InsertHour(Hour hour);
        Hour UpdateHour(int hourId, Hour hour);
    }
}