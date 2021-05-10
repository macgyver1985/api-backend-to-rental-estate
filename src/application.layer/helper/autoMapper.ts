import { AutoMapper } from '@layer/crossCutting/autoMapper';
import { IAutoMapper } from '@layer/crossCutting/autoMapper/interfaces';
import { EBusinessType, PricingInfosData, RealEstateData } from '@layer/domain/realEstate';
import { PricingInfosDTO, RealEstateDTO } from '../models/realEstate';

const autoMapper: IAutoMapper = new AutoMapper();

autoMapper.createMap<RealEstateDTO, RealEstateData>(
  Symbol.for('RealEstateDTO'),
  Symbol.for('RealEstateData'),
)
  .forMember('createdAt', (t) => new Date(t.createdAt))
  .forMember('updatedAt', (t) => new Date(t.updatedAt));

autoMapper.createMap<PricingInfosDTO, PricingInfosData>(
  Symbol.for('PricingInfosDTO'),
  Symbol.for('PricingInfosData'),
)
  .forMember('businessType', (t) => EBusinessType[t.businessType])
  .forMember('monthlyCondoFee', (t) => Number(t.monthlyCondoFee))
  .forMember('price', (t) => Number(t.price))
  .forMember('yearlyIptu', (t) => Number(t.yearlyIptu));

export default autoMapper;
