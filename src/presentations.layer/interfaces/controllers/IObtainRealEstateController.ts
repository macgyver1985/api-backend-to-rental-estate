import GetPage from '@layer/presentations/requests/common';
import PagedDataModel from '@layer/presentations/responses/common';
import { RealEstateModel } from '@layer/presentations/responses/realEstate';
import { IController } from '../base';

export type IObtainRealEstateController = IController<GetPage, PagedDataModel<RealEstateModel>>;
