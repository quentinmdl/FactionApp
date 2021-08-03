using Factio.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Factio.BL
{
    public interface IBenefitService
    {
        Benefit GetBenefitById(int benefitId);
        List<Benefit> GetAllBenefits();
        List<Benefit> GetBenefitsByInvoiceFk(int invoiceId);
        bool DeleteBenefit(int benefitId);
        Benefit InsertBenefit(Benefit benefit);
        Benefit UpdateBenefit(int benefitId, Benefit benefit);
    }
}