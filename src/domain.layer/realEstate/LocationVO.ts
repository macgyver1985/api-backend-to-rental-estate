import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';
import resource from '../resources/ContractValidationMessages.json';

interface ILocationVO {
  lon: number;
  lat: number;
}

export type LocationData = {
  lon: number;
  lat: number;
};

export default class LocationVO implements ILocationVO {
  #lon: number;

  #lat: number;

  private constructor(data: ILocationVO) {
    this.#lon = data.lon;
    this.#lat = data.lat;
  }

  public static create(data: LocationData, contractValidator: IContractValidator) : LocationVO {
    const isValid = contractValidator
      .required({
        context: LocationVO.name,
        property: 'lat',
        message: <string>resource.LAT_REQUIRED,
        value: data.lat?.toString(),
      })
      .required({
        context: LocationVO.name,
        property: 'lon',
        message: <string>resource.LON_REQUIRED,
        value: data.lon?.toString(),
      })
      .isValid((t) => t === LocationVO.name);

    if (!isValid) {
      return null;
    }

    return new LocationVO(data);
  }

  public get lon() : number {
    return this.#lon;
  }

  public get lat() : number {
    return this.#lat;
  }
}
