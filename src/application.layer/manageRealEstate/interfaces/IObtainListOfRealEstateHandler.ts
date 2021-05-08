import { IHandler } from '@layer/application/interfaces/base';
import { RealEstateDTO } from '@layer/application/models/realEstate';
import IObtainListOfRealEstate from '../commands/IObtainListOfRealEstate';

export type IObtainListOfRealEstateHandler =
    IHandler<IObtainListOfRealEstate, Array<RealEstateDTO>>;
