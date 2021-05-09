import PartnerDTO from '@layer/application/models/partner';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ICompatibility, ICompatibilityFactory } from '../interfaces';
import VivaRealCompatibility from './VivaRealCompatibility';
import ZapCompatibility from './ZapCompatibility';

@injectable()
export default class CompatibilityFactory implements ICompatibilityFactory {
    #mapper: Array<{ partinerID: string, isCompatible: ICompatibility }>;

    public constructor() {
      this.#mapper = [];

      this.#mapper.push({
        partinerID: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
        isCompatible: new ZapCompatibility(),
      },
      {
        partinerID: '142ce1dd-64da-40ab-9458-0c3f88a5fa6a',
        isCompatible: new VivaRealCompatibility(),
      });
    }

    isCompatibleWithPartner(partner: PartnerDTO, realEstateEntity: RealEstateEntity): boolean {
      const comp = this.#mapper
        .find((t) => t.partinerID === partner.id)
        ?.isCompatible;

      if (!comp) {
        return false;
      }

      return comp.isCompatibleWithPartner(partner, realEstateEntity);
    }
}
