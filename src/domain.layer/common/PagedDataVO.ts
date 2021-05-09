import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import validationMessageResources from '../resources';

interface IPagedDataVO<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  listings: Array<T>;
}

export type PagedData<T> = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  listings: Array<T>;
};

export class PagedDataVO<T> implements IPagedDataVO<T> {
    #pageNumber: number;

    #pageSize: number;

    #totalCount: number;

    #listings: T[];

    private constructor(data: IPagedDataVO<T>) {
      this.#pageNumber = data.pageNumber;
      this.#pageSize = data.pageSize;
      this.#totalCount = data.totalCount;
    }

    public get pageNumber(): number {
      return this.#pageNumber;
    }

    public get pageSize(): number {
      return this.#pageSize;
    }

    public get totalCount(): number {
      return this.#totalCount;
    }

    public get listings(): T[] {
      return this.#listings;
    }

    public static create<TData>(
      data: PagedData<TData>,
      contractValidator: IContractValidator,
    ): PagedDataVO<TData> {
      const isValid = contractValidator
        .required({
          context: PagedDataVO.name,
          property: 'pageNumber',
          message: validationMessageResources.PAGE_NUMBER_REQUIRED,
          value: data.pageNumber?.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'pageNumber',
          message: validationMessageResources.PAGE_NUMBER_INVALID,
          value: data.pageNumber,
          expected: 1,
        })
        .isLessThanOrEqual({
          context: PagedDataVO.name,
          property: 'pageNumber',
          message: validationMessageResources.PAGE_NUMBER_INVALID,
          value: data.pageNumber,
          expected: data.totalCount,
        })
        .required({
          context: PagedDataVO.name,
          property: 'pageSize',
          message: validationMessageResources.PAGE_SIZE_REQUIRED,
          value: data.pageSize?.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'pageSize',
          message: validationMessageResources.PAGE_SIZE_INVALID,
          value: data.pageSize,
          expected: 1,
        })
        .required({
          context: PagedDataVO.name,
          property: 'totalCount',
          message: validationMessageResources.TOTAL_COUNT_REQUIRED,
          value: data.totalCount?.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'totalCount',
          message: validationMessageResources.TOTAL_COUNT_INVALID,
          value: data.totalCount,
          expected: 1,
        })
        .required({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_REQUIRED,
          value: data.listings?.length.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_REQUIRED,
          value: data.listings?.length,
          expected: 1,
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_INVALID,
          value: data.listings?.length,
          expected: data.pageSize,
        })
        .isValid((t) => t === PagedDataVO.name);

      if (!isValid) {
        return null;
      }

      return new PagedDataVO<TData>({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        listings: data.listings,
      });
    }
}
