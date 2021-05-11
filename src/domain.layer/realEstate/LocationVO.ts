import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import validationMessageResources from '../resources';

interface ILocationVO {
  lon: number;
  lat: number;
}

export type LocationData = {
  lon: number;
  lat: number;
};

export class LocationVO implements ILocationVO {
  #lon: number;

  #lat: number;

  private constructor(data: ILocationVO) {
    this.#lon = data.lon;
    this.#lat = data.lat;
  }

  public get lon() : number {
    return this.#lon;
  }

  public get lat() : number {
    return this.#lat;
  }

  public static create(data: LocationData, contractValidator: IContractValidator) : LocationVO {
    const isValid = contractValidator
      .required({
        context: LocationVO.name,
        property: 'lat',
        message: validationMessageResources.LAT_REQUIRED,
        value: data.lat?.toString(),
      })
      .isDifferentThan({
        context: LocationVO.name,
        property: 'lat',
        message: validationMessageResources.LAT_INVALID,
        value: data.lat?.toString(),
        expected: ['0'],
      })
      .required({
        context: LocationVO.name,
        property: 'lon',
        message: validationMessageResources.LON_REQUIRED,
        value: data.lon?.toString(),
      })
      .isDifferentThan({
        context: LocationVO.name,
        property: 'lon',
        message: validationMessageResources.LON_INVALID,
        value: data.lat?.toString(),
        expected: ['0'],
      })
      .isValid((t) => t === LocationVO.name);

    if (!isValid) {
      return null;
    }

    return new LocationVO(data);
  }
}
