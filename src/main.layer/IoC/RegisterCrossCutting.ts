import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { interfaces } from 'inversify';

const registerCrossCutting = (container: interfaces.Container): void => {
  container.bind<IContractValidator>(fluentValidationTypes.IContractValidator)
    .to(ContractValidator).inSingletonScope();
};

export default registerCrossCutting;
