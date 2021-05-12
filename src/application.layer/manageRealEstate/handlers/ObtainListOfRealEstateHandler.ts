import { autoMapper } from '@layer/application/helper';
import { ICache, types as cacheTypes } from '@layer/application/interfaces/sockets/cache';
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

  #cache: ICache;

  public constructor(
  @inject(socketsTypes.IServiceToObtainRealEstate) service: IServiceToObtainRealEstate,
    @inject(repositoriesTypes.IPartnerRepository) partnerRepository: IPartnerRepository,
    @inject(businessTypes.ICompatibilityFactory) compatibilityFactory: ICompatibilityFactory,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
    @inject(cacheTypes.ICache) cache: ICache,
  ) {
    this.#service = service;
    this.#partnerRepository = partnerRepository;
    this.#contractValidator = contractValidator;
    this.#compatibilityFactory = compatibilityFactory;
    this.#cache = cache;
  }

  public async execute(
    command: ObtainListOfRealEstateCommand,
  ): Promise<PagedDataVO<RealEstateEntity>> {
    const listings: Array<RealEstateEntity> = [];

    const buffer = await this.#cache
      ?.obtain(command.partnerID, 'RealEstateDTO');
    const listDTO: Array<RealEstateDTO> = [];

    if (buffer) {
      listDTO.push(...(<Array<RealEstateDTO>>JSON.parse(buffer.toString('utf-8'))));
    }

    if (!listDTO || listDTO.length === 0) {
      await this.#service.obtainOnDemand();

      const partner = await this.#partnerRepository
        .findSpecific((t) => t.id === command.partnerID);

      await this.#loading(1, 100, listings, listDTO, partner);

      await this.#cache?.register(
        command.partnerID,
        'RealEstateDTO',
        Buffer.from(JSON.stringify(listDTO)),
      );
    } else {
      listDTO.forEach((t) => {
        const data = autoMapper.mapper<RealEstateDTO, RealEstateData>(
          Symbol.for('RealEstateDTO'),
          Symbol.for('RealEstateData'),
        ).map(t, <RealEstateData>{});
        const item = RealEstateEntity.create(data, this.#contractValidator);

        listings.push(item);
      });
    }

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
    listingsDTO: Array<RealEstateDTO>,
    partner: PartnerDTO,
  ): Promise<void> => {
    const resp = await this.#service.nextIndex(index, range);

    resp.list.forEach((t) => {
      const data = autoMapper.mapper<RealEstateDTO, RealEstateData>(
        Symbol.for('RealEstateDTO'),
        Symbol.for('RealEstateData'),
      ).map(t, <RealEstateData>{});
      const item = RealEstateEntity.create(data, this.#contractValidator);

      if (!item) {
        this.#contractValidator
          .cleanNotifications();

        return;
      }

      const isComp = this.#compatibilityFactory
        .isCompatibleWithPartner(partner, item);

      if (isComp) {
        listings.push(item);

        listingsDTO.push(t);
      }
    });

    if (resp.hasNext) {
      await this.#loading(resp.nextIndex, resp.rangeList, listings, listingsDTO, partner);
    }
  };
}
