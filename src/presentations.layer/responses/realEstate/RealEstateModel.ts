import AddressModel from './AddressModel';
import PricingInfosModel from './PricingInfosModel';

type RealEstateModel = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  usableAreas?: number;
  listingType?: string;
  listingStatus?: string;
  parkingSpaces?: number;
  owner?: boolean;
  bathrooms?: number;
  bedrooms?: number;
  images?: Array<string>;
  address?: AddressModel;
  pricingInfos?: PricingInfosModel;
};

export default RealEstateModel;
