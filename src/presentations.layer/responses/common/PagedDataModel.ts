type PagedDataModel<T> = {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalCount?: number;
  listings?: Array<T>;
};

export default PagedDataModel;
