import { inject, injectable } from 'inversify';
import { types as socketsTypes } from '@layer/application/interfaces/sockets';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { IServiceToObtainRealEstate } from '../interfaces/sockets';
import { RealEstateDTO } from '../models/realEstate';
import IObtainListOfRealEstate from './commands/IObtainListOfRealEstate';
import { IObtainListOfRealEstateHandler } from './interfaces/IObtainListOfRealEstateHandler';

@injectable()
export default class ObtainListOfRealEstateHandler implements IObtainListOfRealEstateHandler {
  #service: IServiceToObtainRealEstate;

  #contractValidator: IContractValidator;

  public constructor(
  @inject(socketsTypes.IServiceToObtainRealEstate)
    service: IServiceToObtainRealEstate,
    @inject(fluentValidationTypes.IContractValidator)
    contractValidator: IContractValidator,
  ) {
    this.#service = service;
    this.#contractValidator = contractValidator;
  }

  execute(command: IObtainListOfRealEstate): Promise<RealEstateDTO[]> {
    throw new Error('Method not implemented.');
  }
}
