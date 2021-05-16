import { AuthenticationHandler, AuthorizeHandler } from '@layer/application/useCase-authentication/handlers';
import { IAuthenticationHandler, IAuthorizeHandler, types as handlerAuthTypes } from '@layer/application/useCase-authentication/interfaces';
import ObtainListOfRealEstateHandler from '@layer/application/useCase-manageRealEstate/handlers';
import { ICompatibilityFactory, IObtainListOfRealEstateHandler, types as handlerTypes } from '@layer/application/useCase-manageRealEstate/interfaces';
import CompatibilityFactory from '@layer/application/useCase-manageRealEstate/support';
import { interfaces } from 'inversify';

const registerApplication = (container: interfaces.Container): void => {
  container.bind<IAuthenticationHandler>(handlerAuthTypes.IAuthenticationHandler)
    .to(AuthenticationHandler).inSingletonScope();
  container.bind<IAuthorizeHandler>(handlerAuthTypes.IAuthorizeHandler)
    .to(AuthorizeHandler).inSingletonScope();
  container.bind<ICompatibilityFactory>(handlerTypes.ICompatibilityFactory)
    .to(CompatibilityFactory).inSingletonScope();
  container.bind<IObtainListOfRealEstateHandler>(handlerTypes.IObtainListOfRealEstateHandler)
    .to(ObtainListOfRealEstateHandler).inSingletonScope();
};

export default registerApplication;
