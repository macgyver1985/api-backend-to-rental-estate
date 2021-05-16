import { AuthenticationController, ObtainRealEstateController } from '@layer/presentations/controllers';
import AuthorizeController from '@layer/presentations/controllers/AuthorizeController';
import {
  IAuthenticationController, IAuthorizeController,
  IObtainRealEstateController, types as controllerTypes,
} from '@layer/presentations/interfaces/controllers';
import { interfaces } from 'inversify';

const registerPresentations = (container: interfaces.Container): void => {
  container.bind<IAuthenticationController>(controllerTypes.IAuthenticationController)
    .to(AuthenticationController).inSingletonScope();
  container.bind<IAuthorizeController>(controllerTypes.IAuthorizeController)
    .to(AuthorizeController).inSingletonScope();
  container.bind<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController)
    .to(ObtainRealEstateController).inSingletonScope();
};

export default registerPresentations;
