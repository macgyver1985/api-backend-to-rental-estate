import GetPage from 'src/presentations.layer/viewModels/request';
import PagedDataModel from 'src/presentations.layer/viewModels/response/common';
import { RealEstateModel } from 'src/presentations.layer/viewModels/response/realEstate';
import { IController } from '../base';

export type IObtainRealEstateController = IController<GetPage, PagedDataModel<RealEstateModel>>;
