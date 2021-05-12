import GetPage from '@layer/presentations/viewModels/request';
import PagedDataModel from '@layer/presentations/viewModels/response/common';
import { RealEstateModel } from '@layer/presentations/viewModels/response/realEstate';
import { IController } from '../base';

export type IObtainRealEstateController = IController<GetPage, PagedDataModel<RealEstateModel>>;
