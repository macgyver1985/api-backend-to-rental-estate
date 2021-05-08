import AddressDTO from './AddressDTO';
import PricingInfosDTO from './PricingInfosDTO';

type RealEstateDTO = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  usableAreas: number;
  listingType: string;
  listingStatus: string;
  parkingSpaces: number;
  owner: boolean;
  bathrooms: number;
  bedrooms: number;
  images: Array<string>;
  address: AddressDTO;
  pricingInfos: PricingInfosDTO;
};

export default RealEstateDTO;
