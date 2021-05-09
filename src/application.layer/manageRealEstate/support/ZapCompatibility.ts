import PartnerDTO from '@layer/application/models/partner';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { ICompatibility } from '../interfaces';

export default class ZapCompatibility implements ICompatibility {
  isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean {
    return true;
  }
}
