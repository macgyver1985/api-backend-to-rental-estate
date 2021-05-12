import ObtainListOfRealEstateHandler from '@layer/application/manageRealEstate/handlers';
import { ICompatibilityFactory, IObtainListOfRealEstateHandler, types as handlerTypes } from '@layer/application/manageRealEstate/interfaces';
import CompatibilityFactory from '@layer/application/manageRealEstate/support';
import { interfaces } from 'inversify';

const registerApplication = (container: interfaces.Container): void => {
  container.bind<ICompatibilityFactory>(handlerTypes.ICompatibilityFactory)
    .to(CompatibilityFactory).inSingletonScope();
  container.bind<IObtainListOfRealEstateHandler>(handlerTypes.IObtainListOfRealEstateHandler)
    .to(ObtainListOfRealEstateHandler).inSingletonScope();
};

export default registerApplication;
