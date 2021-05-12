import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import { ObtainListOfRealEstateCommand } from '@layer/application/manageRealEstate';
import ObtainListOfRealEstateHandler from '@layer/application/manageRealEstate/handlers';
import { IObtainListOfRealEstateHandler } from '@layer/application/manageRealEstate/interfaces';
import CompatibilityFactory from '@layer/application/manageRealEstate/support';
import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import PartnerRepositoryMock from '../__manual-mock__/PartnerRepositoryMock';
import ServiceToObtainRealEstateMock from '../__manual-mock__/ServiceToObtainRealEstateMock';

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
    null,
  );

  it('Retorna com sucesso a primeira página com cinco registros.', async () => {
    const command = ObtainListOfRealEstateCommand.create({
      pageNumber: 1,
      pageSize: 5,
      partnerID: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
    }, contractValidator);

    const result = await handler.execute(command);

    expect(result.listings.length).toEqual(5);
    expect(result.listings[0].id).toEqual('1eeef4f6fde9');
    expect(result.listings[4].id).toEqual('a6c82735be7e');
    expect(result.pageNumber).toEqual(1);
    expect(result.pageSize).toEqual(5);
    expect(result.totalCount).toEqual(2);
  });

  it('Retorna com sucesso a segunda página com 1 registro.', async () => {
    const command = ObtainListOfRealEstateCommand.create({
      pageNumber: 2,
      pageSize: 5,
      partnerID: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
    }, contractValidator);

    const result = await handler.execute(command);

    expect(result.listings.length).toEqual(1);
    expect(result.listings[0].id).toEqual('26e61f526af8');
    expect(result.pageNumber).toEqual(2);
    expect(result.pageSize).toEqual(5);
    expect(result.totalCount).toEqual(2);
  });
});
