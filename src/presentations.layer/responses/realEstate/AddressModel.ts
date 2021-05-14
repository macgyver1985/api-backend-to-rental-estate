import GeoLocationModel from './GeoLocationModel';

type AddressModel = {
  city?: string;
  neighborhood?: string;
  geoLocation?: GeoLocationModel;
};

export default AddressModel;
