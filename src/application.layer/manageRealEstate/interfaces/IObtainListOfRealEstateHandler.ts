import { IHandler } from '@layer/application/interfaces/base';
import { PagedDataVO } from '@layer/domain/common/PagedDataVO';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { ObtainListOfRealEstateCommand } from '..';

export type IObtainListOfRealEstateHandler =
    IHandler<ObtainListOfRealEstateCommand, PagedDataVO<RealEstateEntity>>;
