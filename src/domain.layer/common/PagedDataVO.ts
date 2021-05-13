import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import validationMessageResources from '../resources';

interface IPagedDataVO<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  listings: Array<T>;
}

export type PagedData<T> = {
  pageNumber: number;
  pageSize: number;
  listings: Array<T>;
};

export class PagedDataVO<T> implements IPagedDataVO<T> {
    #pageNumber: number;

    #pageSize: number;

    #totalPages: number;

    #totalCount: number;

    #listings: T[];

    private constructor(data: IPagedDataVO<T>) {
      this.#pageNumber = data.pageNumber;
      this.#pageSize = data.pageSize;
      this.#totalPages = data.totalPages;
      this.#totalCount = data.totalCount;
      this.#listings = data.listings;
    }

    public get pageNumber(): number {
      return this.#pageNumber;
    }

    public get pageSize(): number {
      return this.#pageSize;
    }

    public get totalPages(): number {
      return this.#totalPages;
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
      const { listings, pageNumber, pageSize } = data;
      const totalPages = Math.trunc(listings.length / pageSize)
       + ((listings.length % pageSize) > 0 ? 1 : 0);
      const totalCount = listings.length;
      const start = (pageSize * pageNumber) - pageSize;
      const end = listings[(pageSize * pageNumber) - 1] ? (pageSize * pageNumber) : undefined;
      const finalList = listings.slice(start, end);

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
          expected: totalPages,
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
          message: validationMessageResources.TOTAL_PAGES_REQUIRED,
          value: totalPages?.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'totalCount',
          message: validationMessageResources.TOTAL_PAGES_INVALID,
          value: totalPages,
          expected: 1,
        })
        .required({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_REQUIRED,
          value: finalList?.length.toString(),
        })
        .isGreaterThanOrEqual({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_REQUIRED,
          value: finalList?.length,
          expected: 1,
        })
        .isLessThanOrEqual({
          context: PagedDataVO.name,
          property: 'listings',
          message: validationMessageResources.LISTINGS_INVALID,
          value: finalList?.length,
          expected: data.pageSize,
        })
        .isValid((t) => t === PagedDataVO.name);

      if (!isValid) {
        return null;
      }

      return new PagedDataVO<TData>({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalPages,
        totalCount,
        listings: finalList,
      });
    }
}
