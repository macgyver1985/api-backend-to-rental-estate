import PartnerDTO from '@layer/application/models/partner';
import { RealEstateEntity } from '@layer/domain/realEstate';

export default interface ICompatibilityFactory {
  isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean;
}
