import { AutoMapper } from '@layer/crossCutting/autoMapper';
import { IAutoMapper } from '@layer/crossCutting/autoMapper/interfaces';
import {
  AddressData, EBusinessType, GeoLocationData, LocationData, PricingInfosData, RealEstateData,
} from '@layer/domain/realEstate';
import {
  AddressDTO, GeoLocationDTO, LocationDTO, PricingInfosDTO, RealEstateDTO,
} from '../models/realEstate';

const autoMapper: IAutoMapper = new AutoMapper();

autoMapper.createMap<RealEstateDTO, RealEstateData>(
  Symbol.for('RealEstateDTO'),
  Symbol.for('RealEstateData'),
)
  .forMember('createdAt', (t) => new Date(t.createdAt))
  .forMember('updatedAt', (t) => new Date(t.updatedAt))
  .forMember('id', (t) => t.id)
  .forMember('bathrooms', (t) => t.bathrooms)
  .forMember('bedrooms', (t) => t.bedrooms)
  .forMember('images', (t) => t.images)
  .forMember('listingStatus', (t) => t.listingStatus)
  .forMember('listingType', (t) => t.listingType)
  .forMember('owner', (t) => t.owner)
  .forMember('parkingSpaces', (t) => t.parkingSpaces)
  .forMember('usableAreas', (t) => t.usableAreas)
  .forMember('address', (t) => autoMapper.mapper<AddressDTO, AddressData>(
    Symbol.for('AddressDTO'),
    Symbol.for('AddressData'),
  )
    .map(t.address, <AddressData>{}))
  .forMember('pricingInfos', (t) => autoMapper.mapper<PricingInfosDTO, PricingInfosData>(
    Symbol.for('PricingInfosDTO'),
    Symbol.for('PricingInfosData'),
  )
    .map(t.pricingInfos, <PricingInfosData>{}));

autoMapper.createMap<PricingInfosDTO, PricingInfosData>(
  Symbol.for('PricingInfosDTO'),
  Symbol.for('PricingInfosData'),
)
  .forMember('businessType', (t) => EBusinessType[t.businessType.toLowerCase()])
  .forMember('monthlyCondoFee', (t) => Number(t.monthlyCondoFee))
  .forMember('price', (t) => Number(t.price))
  .forMember('yearlyIptu', (t) => Number(t.yearlyIptu));

autoMapper.createMap<AddressDTO, AddressData>(
  Symbol.for('AddressDTO'),
  Symbol.for('AddressData'),
)
  .forMember('city', (t) => t.city)
  .forMember('neighborhood', (t) => t.neighborhood)
  .forMember('geoLocation', (t) => autoMapper.mapper<GeoLocationDTO, GeoLocationData>(
    Symbol.for('GeoLocationDTO'),
    Symbol.for('GeoLocationData'),
  )
    .map(t.geoLocation, <GeoLocationData>{}));

autoMapper.createMap<GeoLocationDTO, GeoLocationData>(
  Symbol.for('GeoLocationDTO'),
  Symbol.for('GeoLocationData'),
)
  .forMember('precision', (t) => t.precision)
  .forMember('location', (t) => autoMapper.mapper<LocationDTO, LocationData>(
    Symbol.for('LocationDTO'),
    Symbol.for('LocationData'),
  )
    .map(t.location, <LocationData>{}));

autoMapper.createMap<LocationDTO, LocationData>(
  Symbol.for('LocationDTO'),
  Symbol.for('LocationData'),
)
  .forMember('lat', (t) => t.lat)
  .forMember('lon', (t) => t.lon);

export default autoMapper;
