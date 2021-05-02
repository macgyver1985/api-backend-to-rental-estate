import ContractValidatorException from '@layer/crossCutting/fluentValidation/ContractValidatorException';
import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';
import INotification from '@layer/crossCutting/fluentValidation/interfaces/INotification';
import EContractValidationCodes from '../resources/EContractValidationCodes';
import resource from '../resources/ContractValidationMessages.json';

type LocationData = {
  lon: number;
  lat: number;
};

export default class LocationVO {
  private attLon: number;

  private attLat: number;

  private constructor(data: LocationData) {
    this.attLon = data.lon ?? 0;
    this.attLat = data.lat ?? 0;
  }

  public static create(data: LocationData, contractValidator: IContractValidator) : LocationVO {
    const notify: Array<INotification> = [];
    const isValid = contractValidator
      .required({
        context: LocationVO.name,
        property: 'lat',
        errorCode: EContractValidationCodes.LAT_REQUIRED,
        value: data.lat?.toString(),
      }, notify)
      .required({
        context: LocationVO.name,
        property: 'lon',
        errorCode: EContractValidationCodes.LON_REQUIRED,
        value: data.lon?.toString(),
      }, notify)
      .isValid(notify);

    if (!isValid) {
      throw new ContractValidatorException(
        'domain',
        contractValidator.getNotificationDetails(notify, resource),
      );
    }

    return new LocationVO(data);
  }

  public get lon() : number {
    return this.attLon;
  }

  public get lat() : number {
    return this.attLat;
  }
}
