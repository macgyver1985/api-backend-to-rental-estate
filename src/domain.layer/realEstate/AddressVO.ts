import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';
import GeoLocationVO, { GeoLocationData } from './GeoLocationVO';

interface IAddressVO {
  city: string;
  neighborhood: string;
  geoLocation: GeoLocationVO;
}

export type AddressData = {
  city: string;
  neighborhood: string;
  geoLocation: GeoLocationData;
};

export default class AddressVO implements IAddressVO {
  #city: string;

  #neighborhood: string;

  #geoLocation: GeoLocationVO;

  private constructor(data: IAddressVO) {
    this.#city = data.city;
    this.#neighborhood = data.neighborhood;
    this.#geoLocation = data.geoLocation;
  }

  public get city(): string {
    return this.#city;
  }

  public get neighborhood(): string {
    return this.#neighborhood;
  }

  public get geoLocation(): GeoLocationVO {
    return this.#geoLocation;
  }

  public static create(data: AddressData, contractValidator: IContractValidator): AddressVO {
    const geoLocation = GeoLocationVO.create(data.geoLocation, contractValidator);

    if (!geoLocation) {
      return null;
    }

    return new AddressVO({
      city: data.city,
      neighborhood: data.neighborhood,
      geoLocation,
    });
  }
}
