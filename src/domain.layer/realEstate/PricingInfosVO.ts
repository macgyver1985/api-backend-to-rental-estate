import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import validationMessageResources from '../resources';

export enum EBusinessType {
  sale = 'SALE',
  rental = 'RENTAL',
}

interface IPricingInfosVO {
  period?: string;
  yearlyIptu: number;
  price: number;
  businessType: EBusinessType;
  monthlyCondoFee: number;
  rentalTotalPrice?: number;
}

export type PricingInfosData = {
  period?: string;
  yearlyIptu: number;
  price: number;
  businessType: EBusinessType;
  monthlyCondoFee: number;
  rentalTotalPrice?: number;
};

export class PricingInfosVO implements IPricingInfosVO {
  #period?: string;

  #yearlyIptu: number;

  #price: number;

  #businessType: EBusinessType;

  #monthlyCondoFee: number;

  #rentalTotalPrice?: number;

  private constructor(data: IPricingInfosVO) {
    this.#period = data.period;
    this.#yearlyIptu = data.yearlyIptu ?? 0;
    this.#price = data.price;
    this.#businessType = data.businessType;
    this.#monthlyCondoFee = data.monthlyCondoFee ?? 0;
    this.#rentalTotalPrice = data.rentalTotalPrice;
  }

  public get period(): string {
    return this.#period;
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

  public get rentalTotalPrice(): number {
    return this.#rentalTotalPrice;
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
        message: validationMessageResources.PRICE_REQUIRED,
      })
      .required({
        context: PricingInfosVO.name,
        property: 'businessType',
        value: data.businessType,
        message: validationMessageResources.BUSINESS_TYPE_REQUIRED,
      })
      .isEquals({
        context: PricingInfosVO.name,
        property: 'businessType',
        value: data.businessType,
        expected: [EBusinessType.rental, EBusinessType.sale],
        message: validationMessageResources.BUSINESS_TYPE_INVALID,
      })
      .isValid((t) => t === PricingInfosVO.name);

    if (!isValid) {
      return null;
    }

    return new PricingInfosVO(data);
  }
}
