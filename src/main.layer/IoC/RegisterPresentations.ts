import { interfaces } from 'inversify';
import ObtainRealEstateController from 'src/presentations.layer/controllers';
import { IObtainRealEstateController, types as controllerTypes } from 'src/presentations.layer/interfaces/controllers';

const registerPresentations = (container: interfaces.Container): void => {
  container.bind<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController)
    .to(ObtainRealEstateController).inSingletonScope();
};

export default registerPresentations;
