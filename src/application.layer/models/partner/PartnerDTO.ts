type PartnerDTO = {
  id: string;
  name: string;
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
  mostExpensiveRentalArea?: {
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
  };
};

export default PartnerDTO;
