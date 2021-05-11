import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import PartnerDTO from '@layer/application/models/partner';

const sourceCustomerRepo: PartnerDTO[] = [{
  id: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
  name: 'Portal ZAP',
  minLon: -46.693419,
  maxLon: -46.641146,
  minLat: -23.568704,
  maxLat: -23.546686,
},
{
  id: '142ce1dd-64da-40ab-9458-0c3f88a5fa6a',
  name: 'Portal Viva Real',
  minLon: 0,
  maxLon: 0,
  minLat: 0,
  maxLat: 0,
  mostExpensiveRentalArea: {
    minLon: -46.693419,
    maxLon: -46.641146,
    minLat: -23.568704,
    maxLat: -23.546686,
  },
}];

const PartnerRepositoryMock = jest.fn<IPartnerRepository, unknown[]>(() => ({
  findAll: async (): Promise<PartnerDTO[]> => {
    const result = await new Promise<PartnerDTO[]>((resolve) => resolve(sourceCustomerRepo));

    return result;
  },
  findByQuery: async (
    predicate: (item: PartnerDTO) => boolean,
  ): Promise<PartnerDTO[]> => {
    const result = await new Promise<PartnerDTO[]>(
      (resolve) => resolve(sourceCustomerRepo.filter(predicate)),
    );

    return result;
  },
  findSpecific: async (
    predicate: (item: PartnerDTO) => boolean,
  ): Promise<PartnerDTO> => {
    const result = await new Promise<PartnerDTO>(
      (resolve) => resolve(sourceCustomerRepo.find(predicate) ?? null),
    );

    return result;
  },
}));

export default PartnerRepositoryMock;
