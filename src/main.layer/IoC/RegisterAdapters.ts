import CacheInFile from '@layer/adapters/cache/CacheInFile';
import { JsonReadingRepository, PartnerRepository, UserRepository } from '@layer/adapters/repositories';
import { IReadingRepository, types as baseRepository } from '@layer/adapters/repositories/interfaces';
import ServiceToObtainRealEstate from '@layer/adapters/services';
import { ICache, types as cacheTypes } from '@layer/application/interfaces/sockets/cache';
import { IPartnerRepository, IUserRepository, types as repositoryTypes } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate, types as servicesTypes } from '@layer/application/interfaces/sockets/services';
import { interfaces } from 'inversify';

const registerAdapters = (container: interfaces.Container): void => {
  container.bind<ICache>(cacheTypes.ICache)
    .to(CacheInFile).inSingletonScope();
  container.bind<IReadingRepository>(baseRepository.IReadingRepository)
    .to(JsonReadingRepository).inSingletonScope();
  container.bind<IPartnerRepository>(repositoryTypes.IPartnerRepository)
    .to(PartnerRepository).inSingletonScope();
  container.bind<IUserRepository>(repositoryTypes.IUserRepository)
    .to(UserRepository).inSingletonScope();
  container.bind<IServiceToObtainRealEstate>(servicesTypes.IServiceToObtainRealEstate)
    .to(ServiceToObtainRealEstate).inSingletonScope();
};

export default registerAdapters;
