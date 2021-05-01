type Location = {
  lon: number;
  lat: number;
};

type GeoLocation = {
  precision: string;
  location: Location;
};

type Address = {
  city: string;
  neighborhood: string;
  geoLocation: GeoLocation;
};

export {
  Location,
  Address,
};
