import { IPartnerRepository, types as repositoriesTypes } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate, types as socketsTypes } from '@layer/application/interfaces/sockets/services';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { PagedDataVO } from '@layer/domain/common';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ObtainListOfRealEstateCommand } from '..';
import { ICompatibilityFactory, IObtainListOfRealEstateHandler, types as businessTypes } from '../interfaces';

@injectable()
export default class ObtainListOfRealEstateHandler implements IObtainListOfRealEstateHandler {
  #service: IServiceToObtainRealEstate;

  #contractValidator: IContractValidator;

  #partnerRepository: IPartnerRepository;

  #compatibilityFactory: ICompatibilityFactory;

  public constructor(
  @inject(socketsTypes.IServiceToObtainRealEstate) service: IServiceToObtainRealEstate,
    @inject(repositoriesTypes.IPartnerRepository) partnerRepository: IPartnerRepository,
    @inject(businessTypes.ICompatibilityFactory) compatibilityFactory: ICompatibilityFactory,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#service = service;
    this.#partnerRepository = partnerRepository;
    this.#contractValidator = contractValidator;
    this.#compatibilityFactory = compatibilityFactory;
  }

  public async execute(
    command: ObtainListOfRealEstateCommand,
  ): Promise<PagedDataVO<RealEstateEntity>> {
    const listings: Array<RealEstateEntity> = [];
    const partner = await this.#partnerRepository.findSpecific((t) => t.id === command.partnerID);

    const response = await (await this.#service.obtainOnDemand())
      .nextIndex(command.pageNumber, command.pageSize);

    response.list.forEach((t) => {
      const item = RealEstateEntity.create(null, this.#contractValidator);

      const isValid = this.#contractValidator
        .isValid((ctx) => ctx === RealEstateEntity.name);

      if (!isValid) {
        this.#contractValidator
          .cleanNotifications((ctx) => ctx === RealEstateEntity.name);

        return;
      }

      const isComp = this.#compatibilityFactory
        .isCompatibleWithPartner(partner, item);

      if (isComp) {
        listings.push(item);
      }
    });

    const result = PagedDataVO.create<RealEstateEntity>({
      pageNumber: response.currentIndex,
      pageSize: response.rangeList,
      totalCount: response.totalIndex,
      listings,
    }, this.#contractValidator);

    this.#contractValidator
      .throwException('application');

    return result;
  }
}
