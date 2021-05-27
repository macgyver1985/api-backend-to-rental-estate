import PartnerDTO from '@layer/application/models/partner';
import { EBusinessType, RealEstateEntity } from '@layer/domain/realEstate';
import { ICompatibility } from '../interfaces';

export default class ImoveisComCompatibility implements ICompatibility {
  isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean {
    switch (realEstateEntity.pricingInfos.businessType) {
      case EBusinessType.rental:
        return this.#isRentalValid(realEstateEntity);

      default:
        return this.#isSaleValid(partner, realEstateEntity);
    }
  }

  #isRentalValid = (real: RealEstateEntity): boolean => !(real.pricingInfos.price < 3500);

  #isSaleValid = (p: PartnerDTO, real: RealEstateEntity): boolean => {
    const minVl = real.address.geoLocation.location.lon >= p.minLon
      && real.address.geoLocation.location.lon <= p.maxLon
      && real.address.geoLocation.location.lat >= p.minLat
      && real.address.geoLocation.location.lat <= p.maxLat
      ? 540000
      : 600000;
    const minAreaVal = real.pricingInfos.price / real.usableAreas;

    return !(real.usableAreas <= 0
      || minAreaVal <= 3500
      || real.pricingInfos.price < minVl);
  };
}
