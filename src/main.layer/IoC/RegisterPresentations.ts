import { AuthenticationController, ObtainRealEstateController } from '@layer/presentations/controllers';
import { IAuthenticationController, IObtainRealEstateController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import { interfaces } from 'inversify';

const registerPresentations = (container: interfaces.Container): void => {
  container.bind<IAuthenticationController>(controllerTypes.IAuthenticationController)
    .to(AuthenticationController).inSingletonScope();
  container.bind<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController)
    .to(ObtainRealEstateController).inSingletonScope();
};

export default registerPresentations;
