import { IServiceToObtainRealEstate, types as socketsTypes } from '@layer/application/interfaces/sockets';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { inject, injectable } from 'inversify';
import { IObtainListOfRealEstateHandler } from '../interfaces/IObtainListOfRealEstateHandler';
import ObtainListOfRealEstateCommand from '../ObtainListOfRealEstateCommand';

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

  public async execute(command: ObtainListOfRealEstateCommand): Promise<RealEstateEntity[]> {
    await (await this.#service.obtainOnDemand())
      .nextIndex(1, 10);

    return null;
  }
}
