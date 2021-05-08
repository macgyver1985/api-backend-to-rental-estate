import { ICommand } from '@layer/application/interfaces/base';

export default interface IObtainListOfRealEstate extends ICommand {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
