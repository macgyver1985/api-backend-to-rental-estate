import { EBusinessType } from '@layer/domain/realEstate/PricingInfosVO';

type PricingInfosDTO = {
  yearlyIptu: number;
  price: number;
  businessType: EBusinessType;
  monthlyCondoFee: number;
};

export default PricingInfosDTO;
