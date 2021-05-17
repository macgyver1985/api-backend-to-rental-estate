import CacheInFile from '@layer/adapters/cache/CacheInFile';
import { JsonReadingRepository, PartnerRepository } from '@layer/adapters/repositories';
import { IReadingRepository } from '@layer/adapters/repositories/interfaces';
import ServiceToObtainRealEstate from '@layer/adapters/services';
import { ICache } from '@layer/application/interfaces/sockets/cache';
import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import ObtainListOfRealEstateHandler from '@layer/application/useCase-manageRealEstate/handlers';
import { ICompatibilityFactory, IObtainListOfRealEstateHandler } from '@layer/application/useCase-manageRealEstate/interfaces';
import CompatibilityFactory from '@layer/application/useCase-manageRealEstate/support';
import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { ObtainRealEstateController } from '@layer/presentations/controllers';
import { IObtainRealEstateController } from '@layer/presentations/interfaces/controllers';

describe('Test ObtainRealEstateController', () => {
  const cache: ICache = new CacheInFile();
  const service: IServiceToObtainRealEstate = new ServiceToObtainRealEstate(cache);
  const readingRepository: IReadingRepository = new JsonReadingRepository();
  const repository: IPartnerRepository = new PartnerRepository(readingRepository);
  const compatibilityFactory: ICompatibilityFactory = new CompatibilityFactory();
  const contractValidator: IContractValidator = new ContractValidator();
  const handler: IObtainListOfRealEstateHandler = new ObtainListOfRealEstateHandler(
    service,
    repository,
    compatibilityFactory,
    contractValidator,
    cache,
  );
  const controller: IObtainRealEstateController = new ObtainRealEstateController(
    handler,
    contractValidator,
  );

  it('Obbtem os dados com sucesso', async () => {
    const result = await controller
      .handle({
        body: {
          pageNumber: 1,
          pageSize: 1,
          identity: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
        },
      });

    expect(result).toEqual(true);
  }, 10000);
});
