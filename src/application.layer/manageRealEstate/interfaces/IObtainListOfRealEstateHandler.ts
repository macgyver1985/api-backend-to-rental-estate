import { IHandler } from '@layer/application/interfaces/base';
import { RealEstateEntity } from '@layer/domain/realEstate';
import ObtainListOfRealEstateCommand from '../ObtainListOfRealEstateCommand';

export type IObtainListOfRealEstateHandler =
    IHandler<ObtainListOfRealEstateCommand, Array<RealEstateEntity>>;
