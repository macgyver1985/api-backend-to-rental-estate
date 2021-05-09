import PartnerDTO from '@layer/application/models/partner';
import { RealEstateEntity } from '@layer/domain/realEstate';

export default interface ICompatibility {
  isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean;
}
