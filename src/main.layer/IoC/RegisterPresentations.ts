import { interfaces } from 'inversify';
import ObtainRealEstateController from '@layer/presentations/controllers';
import { IObtainRealEstateController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';

const registerPresentations = (container: interfaces.Container): void => {
  container.bind<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController)
    .to(ObtainRealEstateController).inSingletonScope();
};

export default registerPresentations;
