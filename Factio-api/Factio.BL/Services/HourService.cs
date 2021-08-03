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
    public class HourService : IHourService
    {
        protected readonly FactioContext _factioContext;

        public HourService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }


        public Hour GetHourById(int hourId)
        {
            try
            {
                Hour hour = _factioContext.Hours
                    .FirstOrDefault(x => x.Id == hourId);
                return hour;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public List<Hour> GetHoursByUserFk(int userId)
        {
            return this._factioContext.Hours.Where(c => c.UserFK == userId).ToList();
        }


        public Hour InsertHour(Hour hour)
        {
            try
            {
                _factioContext.Hours.Add(hour);
                _factioContext.SaveChanges();
                return hour;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Hour UpdateHour(int hourId, Hour hour)
        {
            try
            {
                Hour oldHour = _factioContext.Hours.FirstOrDefault(x => x.Id == hourId);

                oldHour.week1 = hour.week1;
                oldHour.week2 = hour.week2;
                oldHour.week3 = hour.week3;
                oldHour.week4 = hour.week4;
                oldHour.week5 = hour.week5;

                _factioContext.SaveChanges();
                return hour;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }

}