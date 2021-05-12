import CacheInFile from '@layer/adapters/cache/CacheInFile';
import PartnerRepository from '@layer/adapters/repositories';
import ServiceToObtainRealEstate from '@layer/adapters/services';
import { ICache, types as cacheTypes } from '@layer/application/interfaces/sockets/cache';
import { IPartnerRepository, types as repositoryTypes } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate, types as servicesTypes } from '@layer/application/interfaces/sockets/services';
import { interfaces } from 'inversify';

const registerAdapters = (container: interfaces.Container): void => {
  container.bind<ICache>(cacheTypes.ICache)
    .to(CacheInFile).inSingletonScope();
  container.bind<IPartnerRepository>(repositoryTypes.IPartnerRepository)
    .to(PartnerRepository).inSingletonScope();
  container.bind<IServiceToObtainRealEstate>(servicesTypes.IServiceToObtainRealEstate)
    .to(ServiceToObtainRealEstate).inSingletonScope();
};

export default registerAdapters;
