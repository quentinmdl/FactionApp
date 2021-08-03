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
    public class BenefitService : IBenefitService
    {
        protected readonly FactioContext _factioContext;

        public BenefitService(FactioContext factioContext)
        {
            _factioContext = factioContext;
        }

        public bool DeleteBenefit(int benefitId)
        {
            try
            {
                Benefit benefit = _factioContext.Benefits.FirstOrDefault(x => x.Id == benefitId);
                _factioContext.Benefits.Remove(benefit);
                _factioContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }

            return true;
        }

        public List<Benefit> GetAllBenefits()
        {
            return this._factioContext.Benefits.ToList();
        }


        public List<Benefit> GetBenefitsByInvoiceFk(int invoiceId)
        {
            return this._factioContext.Benefits.ToList();
        }

        public Benefit GetBenefitById(int benefitId)
        {
            try
            {
                Benefit benefit = _factioContext.Benefits
                    .FirstOrDefault(x => x.Id == benefitId);
                return benefit;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public Benefit InsertBenefit(Benefit benefit)
        {
            try
            {
                _factioContext.Benefits.Add(benefit);
                _factioContext.SaveChanges();
                return benefit;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public Benefit UpdateBenefit(int benefitId, Benefit benefit)
        {
            try
            {
                Benefit oldBenefit = _factioContext.Benefits.FirstOrDefault(x => x.Id == benefitId);

                oldBenefit.Product = benefit.Product;
                oldBenefit.Price = benefit.Price;
                oldBenefit.Quantiy = benefit.Quantiy;
                oldBenefit.TotalPriceHt = benefit.TotalPriceHt;

                _factioContext.SaveChanges();
                return benefit;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }
    }

}