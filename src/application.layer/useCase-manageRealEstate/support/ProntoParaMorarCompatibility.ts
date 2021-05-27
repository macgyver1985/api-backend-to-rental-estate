import PartnerDTO from '@layer/application/models/partner';
import { EBusinessType, RealEstateEntity } from '@layer/domain/realEstate';
import { ICompatibility } from '../interfaces';

export default class ProntoParaMorarCompatibility implements ICompatibility {
  isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean {
    switch (realEstateEntity.pricingInfos.businessType) {
      case EBusinessType.rental:
        return this.#isRentalValid(partner, realEstateEntity);

      default:
        return this.#isSaleValid(realEstateEntity);
    }
  }

  #isRentalValid = (p:PartnerDTO, real: RealEstateEntity): boolean => {
    const maxVl = real.address.geoLocation.location.lon >= p.mostExpensiveRentalArea.minLon
      && real.address.geoLocation.location.lon <= p.mostExpensiveRentalArea.maxLon
      && real.address.geoLocation.location.lat >= p.mostExpensiveRentalArea.minLat
      && real.address.geoLocation.location.lat <= p.mostExpensiveRentalArea.maxLat
      ? 6000
      : 4000;
    const maxCondoVl = real.pricingInfos.price * 0.3;

    return !(Number.isNaN(real.pricingInfos.monthlyCondoFee)
      || real.pricingInfos.monthlyCondoFee > maxCondoVl
      || real.pricingInfos.price > maxVl);
  };

  #isSaleValid = (real: RealEstateEntity): boolean => (real.pricingInfos.price <= 700000);
}
