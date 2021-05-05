import IContractValidator from '@layer/crossCutting/fluentValidation/interfaces/IContractValidator';
import { v4 as uuidv4 } from 'uuid';
import IEntity from '../interfaces/IEntity';
import AddressVO, { AddressData } from './AddressVO';
import PricingInfosVO, { PricingInfosData } from './PricingInfosVO';
import resource from '../resources/ContractValidationMessages.json';

interface IRealEstateEntity extends IEntity {
  createdAt: Date;
  updatedAt: Date;
  usableAreas: number;
  listingType: string;
  listingStatus: string;
  parkingSpaces: number;
  owner: boolean;
  bathrooms: number;
  bedrooms: number;
  images: Array<string>;
  address: AddressVO;
  pricingInfos: PricingInfosVO;
}

export type RealEstateData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  usableAreas: number;
  listingType: string;
  listingStatus: string;
  parkingSpaces: number;
  owner: boolean;
  bathrooms: number;
  bedrooms: number;
  images: Array<string>;
  address: AddressData;
  pricingInfos: PricingInfosData;
};

export default class RealEstateEntity implements IRealEstateEntity {
    #id: string;

    #createdAt: Date;

    #updatedAt: Date;

    #usableAreas: number;

    #listingType: string;

    #listingStatus: string;

    #parkingSpaces: number;

    #owner: boolean;

    #bathrooms: number;

    #bedrooms: number;

    #images: string[];

    #address: AddressVO;

    #pricingInfos: PricingInfosVO;

    #contractValidator: IContractValidator;

    private constructor(data: IRealEstateEntity, contractValidator: IContractValidator) {
      this.#contractValidator = contractValidator;

      this.#id = !data.id || data.id === '' ? uuidv4() : data.id;
      this.#createdAt = data.createdAt;
      this.#updatedAt = data.updatedAt;
      this.#usableAreas = data.usableAreas;
      this.#listingType = data.listingType;
      this.#listingStatus = data.listingStatus;
      this.#parkingSpaces = data.parkingSpaces;
      this.#owner = data.owner;
      this.#bathrooms = data.bathrooms;
      this.#bedrooms = data.bedrooms;
      this.#images = data.images;
      this.#address = data.address;
      this.#pricingInfos = data.pricingInfos;
    }

    private static create(
      data: RealEstateData,
      contractValidator: IContractValidator,
    ): RealEstateEntity {
      const address = AddressVO.create(data.address, contractValidator);
      const pricingInfos = PricingInfosVO.create(data.pricingInfos, contractValidator);

      return new RealEstateEntity({
        ...data,
        address,
        pricingInfos,
      }, contractValidator);
    }

    public get id(): string {
      return this.#id;
    }

    public get createdAt(): Date {
      return this.#createdAt;
    }

    public get updatedAt(): Date {
      return this.#updatedAt;
    }

    public get usableAreas(): number {
      return this.#usableAreas;
    }

    public get listingType(): string {
      return this.#listingType;
    }

    public get listingStatus(): string {
      return this.#listingStatus;
    }

    public get parkingSpaces(): number {
      return this.#parkingSpaces;
    }

    public get owner(): boolean {
      return this.#owner;
    }

    public get bathrooms(): number {
      return this.#bathrooms;
    }

    public get bedrooms(): number {
      return this.#bedrooms;
    }

    public get images(): string[] {
      return this.#images.map((t) => t);
    }

    public get address(): AddressVO {
      return this.#address;
    }

    public get pricingInfos(): PricingInfosVO {
      return this.#pricingInfos;
    }

    public changeUsableAreas(data: number): RealEstateEntity {
      this.#contractValidator
        .isGreaterThan({
          context: `${RealEstateEntity.name}_${this.#id}`,
          property: 'usableAreas',
          message: <string>resource.USABLE_AREAS_INVALID,
          value: data,
          expected: -1,
        })
        .throwException('domain', (t) => t === `${RealEstateEntity.name}_${this.#id}`);

      this.#usableAreas = data;
      this.#updatedAt = new Date();

      return this;
    }

    public changeAddress(data: AddressData): RealEstateEntity {
      const result = AddressVO.create(data, this.#contractValidator);

      this.#contractValidator
        .throwException('domain', (t) => t === AddressVO.name);

      this.#address = result;
      this.#updatedAt = new Date();

      return this;
    }

    public changePricingInfos(data: PricingInfosData): RealEstateEntity {
      const result = PricingInfosVO.create(data, this.#contractValidator);

      this.#contractValidator
        .throwException('domain', (t) => t === PricingInfosVO.name);

      this.#pricingInfos = result;
      this.#updatedAt = new Date();

      return this;
    }
}
