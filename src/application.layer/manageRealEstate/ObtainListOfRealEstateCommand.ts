import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import CommandHelper from '../helper';
import validationMessageResources from '../resources';

interface IObtainListOfRealEstateCommand {
  pageNumber: number;
  pageSize: number;
  partnerID: string;
}

export type ObtainListOfRealEstateCommandData = {
  pageNumber: number;
  pageSize: number;
  partnerID: string;
  processID?: string;
};

export class ObtainListOfRealEstateCommand extends CommandHelper
  implements IObtainListOfRealEstateCommand {
  #pageNumber: number;

  #pageSize: number;

  #partnerID: string;

  private constructor(data: IObtainListOfRealEstateCommand, processID?: string) {
    super(processID);

    this.#pageNumber = data.pageNumber;
    this.#pageSize = data.pageSize;
    this.#partnerID = data.partnerID;
  }

  public static create(
    data: ObtainListOfRealEstateCommandData,
    contractValidator: IContractValidator,
  ): ObtainListOfRealEstateCommand {
    const isValid = contractValidator
      .required({
        context: ObtainListOfRealEstateCommand.name,
        property: 'pageNumber',
        message: validationMessageResources.PAGE_NUMBER_REQUIRED,
        value: data.pageNumber?.toString(),
      })
      .isGreaterThanOrEqual({
        context: ObtainListOfRealEstateCommand.name,
        property: 'pageNumber',
        message: validationMessageResources.PAGE_NUMBER_INVALID,
        value: data.pageNumber,
        expected: 1,
      })
      .required({
        context: ObtainListOfRealEstateCommand.name,
        property: 'pageSize',
        message: validationMessageResources.PAGE_SIZE_REQUIRED,
        value: data.pageSize?.toString(),
      })
      .isGreaterThanOrEqual({
        context: ObtainListOfRealEstateCommand.name,
        property: 'pageSize',
        message: validationMessageResources.PAGE_SIZE_INVALID,
        value: data.pageSize,
        expected: 1,
      })
      .required({
        context: ObtainListOfRealEstateCommand.name,
        property: 'partnerID',
        message: validationMessageResources.PERTNER_ID_REQUIRED,
        value: data.partnerID,
      })
      .isUUID({
        context: ObtainListOfRealEstateCommand.name,
        property: 'partnerID',
        message: validationMessageResources.PARTNER_ID_INVALID,
        value: data.partnerID,
      })
      .isValid((t) => t === ObtainListOfRealEstateCommand.name);

    if (!isValid) {
      return null;
    }

    return new ObtainListOfRealEstateCommand({
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      partnerID: data.partnerID,
    }, data.processID);
  }

  public get pageNumber(): number {
    return this.#pageNumber;
  }

  public get pageSize(): number {
    return this.#pageSize;
  }

  public get partnerID(): string {
    return this.#partnerID;
  }
}
