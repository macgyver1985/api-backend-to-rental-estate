import { RealEstateEntity } from '@layer/domain/realEstate';
import { ICommand, IHandler } from '../interfaces/base';

export interface IObtainCommand extends ICommand<RealEstateEntity> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  p
}

export type IObtainHandler = IHandler<IObtainCommand, RealEstateEntity>;

export class ObtainHandler implements IObtainHandler {
  execute(command: IObtainCommand): Promise<RealEstateEntity> {
    throw new Error('Method not implemented.');
  }
}
