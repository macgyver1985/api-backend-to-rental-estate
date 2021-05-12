type PagedDataModel<T> = {
  pageNumber?: number;
  pageSize?: number;
  totalCount?: number;
  listings?: Array<T>;
};

export default PagedDataModel;
