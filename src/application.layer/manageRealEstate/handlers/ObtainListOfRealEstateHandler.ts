import { autoMapper } from '@layer/application/helper';
import { IPartnerRepository, types as repositoriesTypes } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate, types as socketsTypes } from '@layer/application/interfaces/sockets/services';
import PartnerDTO from '@layer/application/models/partner';
import { RealEstateDTO } from '@layer/application/models/realEstate';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { PagedDataVO } from '@layer/domain/common';
import { RealEstateData, RealEstateEntity } from '@layer/domain/realEstate';
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

    await this.#service.obtainOnDemand();

    await this.#loading(1, 100, listings, partner);

    const result = PagedDataVO.create<RealEstateEntity>({
      pageNumber: command.pageNumber,
      pageSize: command.pageSize,
      listings,
    }, this.#contractValidator);

    this.#contractValidator
      .throwException('application');

    return result;
  }

  #loading = async (
    index: number,
    range: number,
    listings: Array<RealEstateEntity>,
    partner: PartnerDTO,
  ): Promise<void> => {
    const resp = await this.#service.nextIndex(index, range);

    resp.list.forEach((t) => {
      const data = autoMapper.mapper<RealEstateDTO, RealEstateData>(
        Symbol.for('RealEstateDTO'),
        Symbol.for('RealEstateData'),
      ).map(t, <RealEstateData>{});
      const item = RealEstateEntity.create(data, this.#contractValidator);

      if (!data) {
        this.#contractValidator
          .cleanNotifications();

        return;
      }

      const isComp = this.#compatibilityFactory
        .isCompatibleWithPartner(partner, item);

      if (isComp) {
        listings.push(item);
      }
    });

    if (resp.hasNext) {
      await this.#loading(resp.nextIndex, resp.rangeList, listings, partner);
    }
  };
}
