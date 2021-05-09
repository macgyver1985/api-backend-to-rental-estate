import { IPartnerRepository, types as repositoriesTypes } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate, types as socketsTypes } from '@layer/application/interfaces/sockets/services';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { PagedDataVO } from '@layer/domain/common';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ObtainListOfRealEstateCommand } from '..';
import { IObtainListOfRealEstateHandler } from '../interfaces';

@injectable()
export default class ObtainListOfRealEstateHandler implements IObtainListOfRealEstateHandler {
  #service: IServiceToObtainRealEstate;

  #contractValidator: IContractValidator;

  #partnerRepository: IPartnerRepository;

  public constructor(
  @inject(socketsTypes.IServiceToObtainRealEstate) service: IServiceToObtainRealEstate,
    @inject(repositoriesTypes.IPartnerRepository) partnerRepository: IPartnerRepository,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#service = service;
    this.#partnerRepository = partnerRepository;
    this.#contractValidator = contractValidator;
  }

  public async execute(
    command: ObtainListOfRealEstateCommand,
  ): Promise<PagedDataVO<RealEstateEntity>> {
    const response = await (await this.#service.obtainOnDemand())
      .nextIndex(command.pageNumber, command.pageSize);

    const result = PagedDataVO.create<RealEstateEntity>({
      pageNumber: response.currentIndex,
      pageSize: response.rangeList,
      totalCount: response.totalIndex,
      listings: null,
    }, this.#contractValidator);

    this.#contractValidator
      .throwException('application');

    return result;
  }
}
