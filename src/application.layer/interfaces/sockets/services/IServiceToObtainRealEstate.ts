import ResultOnDemandDTO from '@layer/application/models/common';
import { RealEstateDTO } from '@layer/application/models/realEstate';

export default interface IServiceToObtainRealEstate {
  obtainOnDemand(): Promise<IServiceToObtainRealEstate>;

  nextIndex(index?: number, range?: number): Promise<ResultOnDemandDTO<RealEstateDTO>>;
}
