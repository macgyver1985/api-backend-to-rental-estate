import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';
import resource from '../resources/ContractValidationMessages.json';

export enum EBusinessType {
  sale = 'SALE',
  rental = 'RENTAL',
}

interface IPricingInfosVO {
  yearlyIptu: number;
  price: number;
  businessType: EBusinessType;
  monthlyCondoFee: number;
}

export type PricingInfosData = {
  yearlyIptu: number;
  price: number;
  businessType: EBusinessType;
  monthlyCondoFee: number;
};

export default class PricingInfosVO implements IPricingInfosVO {
  #yearlyIptu: number;

  #price: number;

  #businessType: EBusinessType;

  #monthlyCondoFee: number;

  private constructor(data: IPricingInfosVO) {
    this.#yearlyIptu = data.yearlyIptu ?? 0;
    this.#price = data.price;
    this.#businessType = data.businessType;
    this.#monthlyCondoFee = data.monthlyCondoFee ?? 0;
  }

  public static create(
    data: PricingInfosData,
    contractValidator: IContractValidator,
  ): PricingInfosVO {
    const isValid = contractValidator
      .required({
        context: PricingInfosVO.name,
        property: 'price',
        value: data.price?.toString(),
        message: <string>resource.PRICE_REQUIRED,
      })
      .required({
        context: PricingInfosVO.name,
        property: 'businessType',
        value: data.businessType?.toString(),
        message: <string>resource.BUSINESS_TYPE_REQUIRED,
      })
      .isEquals({
        context: PricingInfosVO.name,
        property: 'businessType',
        value: data.businessType?.toString(),
        expected: [EBusinessType.rental, EBusinessType.sale],
        message: <string>resource.BUSINESS_TYPE_INVALID,
      })
      .isValid((t) => t === PricingInfosVO.name);

    if (!isValid) {
      return null;
    }

    return new PricingInfosVO(data);
  }

  public get yearlyIptu(): number {
    return this.#yearlyIptu;
  }

  public get price(): number {
    return this.#price;
  }

  public get businessType(): EBusinessType {
    return this.#businessType;
  }

  public get monthlyCondoFee(): number {
    return this.#monthlyCondoFee;
  }
}
