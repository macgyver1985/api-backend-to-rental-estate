import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { IEntity } from '../interfaces';
import validationMessageResources from '../resources';
import { AddressData, AddressVO } from './AddressVO';
import { PricingInfosData, PricingInfosVO } from './PricingInfosVO';

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

type RealEstateData = {
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

type RealEstateChangeData = {
  usableAreas?: number;
  listingType?: string;
  listingStatus?: string;
  parkingSpaces?: number;
  owner?: boolean;
  bathrooms?: number;
  bedrooms?: number;
  images: Array<string>;
  address?: AddressData;
  pricingInfos?: PricingInfosData;
};

export default class RealEstateEntity implements IRealEstateEntity {
  // #region Variáveis Privadas
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
  // #endregion

  // #region Mapper para auxíliar a validação dos atributos
  private static mapperValidator: Array<{
    prop: keyof RealEstateData,
    func: (
      context: string,
      data: string | Array<string> | number,
      contractValidator: IContractValidator
    ) => void
  }> = [
    {
      prop: 'usableAreas',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'usableAreas',
            message: validationMessageResources.USABLE_AREAS_REQUIRED,
            value: data.toString(),
          })
          .isGreaterThan({
            context,
            property: 'usableAreas',
            message: validationMessageResources.USABLE_AREAS_INVALID,
            value: <number>data,
            expected: -1,
          });
      },
    },
    {
      prop: 'listingType',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'listingType',
            message: validationMessageResources.LISTING_TYPE_REQUIRED,
            value: <string>data,
          });
      },
    },
    {
      prop: 'listingStatus',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'listingStatus',
            message: validationMessageResources.LISTING_STATUS_REQUIRED,
            value: <string>data,
          });
      },
    },
    {
      prop: 'parkingSpaces',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'parkingSpaces',
            message: validationMessageResources.PARKING_SPACES_REQUIRED,
            value: data.toString(),
          })
          .isGreaterThan({
            context,
            property: 'parkingSpaces',
            message: validationMessageResources.PARKING_SPACES_INVALID,
            value: <number>data,
            expected: -1,
          });
      },
    },
    {
      prop: 'bathrooms',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'bathrooms',
            message: validationMessageResources.BATHROOMS_REQUIRED,
            value: data.toString(),
          })
          .isGreaterThan({
            context,
            property: 'bathrooms',
            message: validationMessageResources.BATHROOMS_INVALID,
            value: <number>data,
            expected: -1,
          });
      },
    },
    {
      prop: 'bedrooms',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'bedrooms',
            message: validationMessageResources.BEDROOMS_REQUIRED,
            value: data.toString(),
          })
          .isGreaterThan({
            context,
            property: 'bedrooms',
            message: validationMessageResources.BEDROOMS_INVALID,
            value: <number>data,
            expected: -1,
          });
      },
    },
    {
      prop: 'images',
      func: (context, data, validator): void => {
        validator
          .required({
            context,
            property: 'images',
            message: validationMessageResources.IMAGES_REQUIRED,
            value: (<string[]>data)?.length.toString(),
          })
          .isGreaterThan({
            context,
            property: 'images',
            message: validationMessageResources.IMAGES_INVALID,
            value: (<string[]>data)?.length,
            expected: 0,
          });
      },
    },
  ];
  // #endregion

  // #region Contrutor padrão da entidade
  private constructor(
    data: IRealEstateEntity,
    contractValidator: IContractValidator,
  ) {
    this.#contractValidator = contractValidator;

    this.#id = data.id;
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
  // #endregion

  // #region Atributos da entidade
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
  // #endregion

  // #region Métodos da entidade
  public static create(
    data: RealEstateData,
    contractValidator: IContractValidator,
  ): RealEstateEntity {
    const id = data.id || data.id === '' ? uuidv4() : data.id;
    const obj = Object.entries(data);

    obj?.forEach((prop) => {
      const validator = RealEstateEntity.mapperValidator.find((v) => v.prop === prop[0]);

      validator?.func(
        `${RealEstateEntity.name}_${id}`,
        prop[1]?.toString(),
        contractValidator,
      );
    });

    const isValid = contractValidator
      .isValid((ctx) => ctx === `${RealEstateEntity.name}_${id}`);
    const address = AddressVO.create(data.address, contractValidator);
    const pricingInfos = PricingInfosVO.create(data.pricingInfos, contractValidator);

    if (!isValid || !address || !pricingInfos) {
      return null;
    }

    return new RealEstateEntity({
      ...data,
      id,
      address,
      pricingInfos,
    }, contractValidator);
  }

  public change(
    data: RealEstateChangeData,
  ): void {
    const obj = Object.entries(data);

    obj?.forEach((prop) => {
      const validator = RealEstateEntity.mapperValidator.find((v) => v.prop === prop[0]);

      validator?.func(
        `${RealEstateEntity.name}_${this.#id}`,
        prop[1]?.toString(),
        this.#contractValidator,
      );
    });

    if (data.address) {
      const address = AddressVO.create(data.address, this.#contractValidator);

      this.#address = address ?? this.#address;
    }

    if (data.pricingInfos) {
      const pricingInfos = PricingInfosVO.create(data.pricingInfos, this.#contractValidator);

      this.#pricingInfos = pricingInfos ?? this.#pricingInfos;
    }

    this.#contractValidator
      .throwException('domain', (ctx) => ctx === `${RealEstateEntity.name}_${this.#id}`
        || ctx === AddressVO.name
        || ctx === PricingInfosVO.name);

    this.#updatedAt = new Date();
    this.#usableAreas = data.usableAreas ?? this.#usableAreas;
    this.#listingType = data.listingType ?? this.#listingType;
    this.#listingStatus = data.listingStatus ?? this.#listingStatus;
    this.#parkingSpaces = data.parkingSpaces ?? this.#parkingSpaces;
    this.#owner = data.owner ?? this.#owner;
    this.#bathrooms = data.bathrooms ?? this.#bathrooms;
    this.#bedrooms = data.bedrooms ?? this.#bedrooms;
    this.#images = data.images ?? this.#images;
  }
  // #endregion
}
