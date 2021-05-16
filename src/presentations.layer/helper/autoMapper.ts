import { AutoMapper } from '@layer/crossCutting/autoMapper';
import { IAutoMapper } from '@layer/crossCutting/autoMapper/interfaces';
import { TokenEntity } from '@layer/domain/accessControl';
import { PagedDataVO } from '@layer/domain/common';
import {
  AddressVO, GeoLocationVO, LocationVO, PricingInfosVO, RealEstateEntity,
} from '@layer/domain/realEstate';
import TokenModel from '../responses/accessControl';
import PagedDataModel from '../responses/common';
import {
  AddressModel, GeoLocationModel, LocationModel, PricingInfosModel, RealEstateModel,
} from '../responses/realEstate';

const autoMapper: IAutoMapper = new AutoMapper();

autoMapper.createMap<PagedDataVO<RealEstateEntity>, PagedDataModel<RealEstateModel>>(
  Symbol.for('PagedDataVO<RealEstateEntity>'),
  Symbol.for('PagedDataModel<RealEstateModel>'),
)
  .forMember('pageNumber', (t) => t.pageNumber)
  .forMember('pageSize', (t) => t.pageSize)
  .forMember('totalPages', (t) => t.totalPages)
  .forMember('totalCount', (t) => t.totalCount)
  .forMember('listings', (t) => (t.listings.map((i) => (autoMapper.mapper<RealEstateEntity, RealEstateModel>(
    Symbol.for('RealEstateEntity'),
    Symbol.for('RealEstateModel'),
  ).map(i, {})))));

autoMapper.createMap<RealEstateEntity, RealEstateModel>(
  Symbol.for('RealEstateEntity'),
  Symbol.for('RealEstateModel'),
)
  .forMember('createdAt', (t) => t.createdAt.toISOString())
  .forMember('updatedAt', (t) => t.updatedAt.toISOString())
  .forMember('id', (t) => t.id)
  .forMember('bathrooms', (t) => t.bathrooms)
  .forMember('bedrooms', (t) => t.bedrooms)
  .forMember('images', (t) => t.images)
  .forMember('listingStatus', (t) => t.listingStatus)
  .forMember('listingType', (t) => t.listingType)
  .forMember('owner', (t) => t.owner)
  .forMember('parkingSpaces', (t) => t.parkingSpaces)
  .forMember('usableAreas', (t) => t.usableAreas)
  .forMember('address', (t) => (autoMapper.mapper<AddressVO, AddressModel>(
    Symbol.for('AddressVO'),
    Symbol.for('AddressModel'),
  )
    .map(t.address, <AddressModel>{})))
  .forMember('pricingInfos', (t) => (autoMapper.mapper<PricingInfosVO, PricingInfosModel>(
    Symbol.for('PricingInfosVO'),
    Symbol.for('PricingInfosModel'),
  )
    .map(t.pricingInfos, <PricingInfosModel>{})));

autoMapper.createMap<PricingInfosVO, PricingInfosModel>(
  Symbol.for('PricingInfosVO'),
  Symbol.for('PricingInfosModel'),
)
  .forMember('businessType', (t) => t.businessType)
  .forMember('monthlyCondoFee', (t) => t.monthlyCondoFee)
  .forMember('price', (t) => t.price)
  .forMember('yearlyIptu', (t) => t.yearlyIptu);

autoMapper.createMap<AddressVO, AddressModel>(
  Symbol.for('AddressVO'),
  Symbol.for('AddressModel'),
)
  .forMember('city', (t) => t.city)
  .forMember('neighborhood', (t) => t.neighborhood)
  .forMember('geoLocation', (t) => (autoMapper.mapper<GeoLocationVO, GeoLocationModel>(
    Symbol.for('GeoLocationVO'),
    Symbol.for('GeoLocationModel'),
  )
    .map(t.geoLocation, <GeoLocationModel>{})));

autoMapper.createMap<GeoLocationVO, GeoLocationModel>(
  Symbol.for('GeoLocationVO'),
  Symbol.for('GeoLocationModel'),
)
  .forMember('precision', (t) => t.precision)
  .forMember('location', (t) => (autoMapper.mapper<LocationVO, LocationModel>(
    Symbol.for('LocationVO'),
    Symbol.for('LocationModel'),
  )
    .map(t.location, <LocationModel>{})));

autoMapper.createMap<LocationVO, LocationModel>(
  Symbol.for('LocationVO'),
  Symbol.for('LocationModel'),
)
  .forMember('lat', (t) => t.lat)
  .forMember('lon', (t) => t.lon);

autoMapper.createMap<TokenEntity, TokenModel>(
  Symbol.for('TokenEntity'),
  Symbol.for('TokenModel'),
)
  .forMember('authorization', (t) => t.authorization)
  .forMember('expiresIn', (t) => t.expiresIn);

export default autoMapper;
