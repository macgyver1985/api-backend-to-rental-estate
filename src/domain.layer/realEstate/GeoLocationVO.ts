import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import resource from '../resources/ContractValidationMessages.json';
import { LocationData, LocationVO } from './LocationVO';

interface IGeoLocationVO {
  precision: string;
  location: LocationVO;
}

export type GeoLocationData = {
  precision: string;
  location: LocationData;
};

export class GeoLocationVO implements IGeoLocationVO {
  #precision: string;

  #location: LocationVO;

  private constructor(data: IGeoLocationVO) {
    this.#location = data.location;
    this.#precision = data.precision;
  }

  public get precision() : string {
    return this.#precision;
  }

  public get location() : LocationVO {
    return this.#location;
  }

  public static create(
    data: GeoLocationData,
    contractValidator: IContractValidator,
  ) : GeoLocationVO {
    const location = LocationVO.create(data.location, contractValidator);
    const isValid = contractValidator
      .required({
        context: GeoLocationVO.name,
        property: 'precision',
        message: resource.PRECISON_REQUIRED,
        value: data.precision?.toString(),
      })
      .isValid((t) => t === GeoLocationVO.name);

    if (!isValid || !location) {
      return null;
    }

    return new GeoLocationVO({
      precision: data.precision,
      location,
    });
  }
}
