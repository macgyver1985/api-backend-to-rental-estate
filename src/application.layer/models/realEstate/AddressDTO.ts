import GeoLocationDTO from './GeoLocationDTO';

type AddressDTO = {
  city: string;
  neighborhood: string;
  geoLocation: GeoLocationDTO;
};

export default AddressDTO;
