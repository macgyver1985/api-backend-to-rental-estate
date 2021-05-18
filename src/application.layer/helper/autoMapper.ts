import { AutoMapper } from '@layer/crossCutting/autoMapper';
import { IAutoMapper } from '@layer/crossCutting/autoMapper/interfaces';
import { UserData } from '@layer/domain/accessControl';
import {
  AddressData, EBusinessType, GeoLocationData, LocationData, PricingInfosData, RealEstateData,
} from '@layer/domain/realEstate';
import UserDTO from '../models/accessControl';
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
  .forMember('address', (t) => (autoMapper.mapper<AddressDTO, AddressData>(
    Symbol.for('AddressDTO'),
    Symbol.for('AddressData'),
  )
    .map(t.address, <AddressData>{})))
  .forMember('pricingInfos', (t) => (autoMapper.mapper<PricingInfosDTO, PricingInfosData>(
    Symbol.for('PricingInfosDTO'),
    Symbol.for('PricingInfosData'),
  )
    .map(t.pricingInfos, <PricingInfosData>{})));

autoMapper.createMap<PricingInfosDTO, PricingInfosData>(
  Symbol.for('PricingInfosDTO'),
  Symbol.for('PricingInfosData'),
)
  .forMember('period', (t) => t.period ?? null)
  .forMember('businessType', (t) => EBusinessType[t.businessType.toLowerCase()])
  .forMember('monthlyCondoFee', (t) => {
    const v = Number(t.monthlyCondoFee);

    if (Number.isNaN(v)) {
      return null;
    }

    return v;
  })
  .forMember('price', (t) => Number(t.price))
  .forMember('yearlyIptu', (t) => {
    const v = Number(t.yearlyIptu);

    if (Number.isNaN(v)) {
      return null;
    }

    return v;
  })
  .forMember('rentalTotalPrice', (t) => (t.rentalTotalPrice ? Number(t.rentalTotalPrice) : 0));

autoMapper.createMap<AddressDTO, AddressData>(
  Symbol.for('AddressDTO'),
  Symbol.for('AddressData'),
)
  .forMember('city', (t) => t.city)
  .forMember('neighborhood', (t) => t.neighborhood)
  .forMember('geoLocation', (t) => (autoMapper.mapper<GeoLocationDTO, GeoLocationData>(
    Symbol.for('GeoLocationDTO'),
    Symbol.for('GeoLocationData'),
  )
    .map(t.geoLocation, <GeoLocationData>{})));

autoMapper.createMap<GeoLocationDTO, GeoLocationData>(
  Symbol.for('GeoLocationDTO'),
  Symbol.for('GeoLocationData'),
)
  .forMember('precision', (t) => t.precision)
  .forMember('location', (t) => (autoMapper.mapper<LocationDTO, LocationData>(
    Symbol.for('LocationDTO'),
    Symbol.for('LocationData'),
  )
    .map(t.location, <LocationData>{})));

autoMapper.createMap<LocationDTO, LocationData>(
  Symbol.for('LocationDTO'),
  Symbol.for('LocationData'),
)
  .forMember('lat', (t) => t.lat)
  .forMember('lon', (t) => t.lon);

autoMapper.createMap<UserDTO, UserData>(
  Symbol.for('UserDTO'),
  Symbol.for('UserData'),
)
  .forMember('id', (t) => t?.id)
  .forMember('partnerId', (t) => t?.partnerId)
  .forMember('password', (t) => t?.password)
  .forMember('userName', (t) => t?.userName);

export default autoMapper;
