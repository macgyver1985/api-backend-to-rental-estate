import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';

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
    this.#yearlyIptu = data.yearlyIptu;
    this.#price = data.price;
    this.#businessType = data.businessType;
    this.#monthlyCondoFee = data.monthlyCondoFee;
  }

  public static create(
    data: PricingInfosData,
    contractValidator: IContractValidator,
  ): PricingInfosVO {
    const isValid = contractValidator
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
