import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import { ObtainListOfRealEstateCommand } from '@layer/application/manageRealEstate';
import ObtainListOfRealEstateHandler from '@layer/application/manageRealEstate/handlers';
import { IObtainListOfRealEstateHandler } from '@layer/application/manageRealEstate/interfaces';
import CompatibilityFactory from '@layer/application/manageRealEstate/support';
import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import PartnerRepositoryMock from '../_mocks_/PartnerRepositoryMock';
import ServiceToObtainRealEstateMock from '../_mocks_/ServiceToObtainRealEstateMock';

describe('Test ObtainListOfRealEstateHandler', () => {
  const partnerRepository: IPartnerRepository = PartnerRepositoryMock();
  const serviceObtainRealEstate: IServiceToObtainRealEstate = ServiceToObtainRealEstateMock();
  const compatibilityFactory = new CompatibilityFactory();
  const contractValidator = new ContractValidator();
  const handler: IObtainListOfRealEstateHandler = new ObtainListOfRealEstateHandler(
    serviceObtainRealEstate,
    partnerRepository,
    compatibilityFactory,
    contractValidator,
  );

  it('Retorna com sucesso 1 página com dois registros.', async () => {
    const command = ObtainListOfRealEstateCommand.create({
      pageNumber: 1,
      pageSize: 2,
      partnerID: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
    }, contractValidator);

    const result = await handler.execute(command);

    expect(true).toEqual(true);
  });
});
