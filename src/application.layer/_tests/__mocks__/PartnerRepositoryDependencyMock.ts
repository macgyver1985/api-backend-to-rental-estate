import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import PartnerDTO from '@layer/application/models/partner';

const sourceCustomerRepo: PartnerDTO[] = [];

const PartnerRepositoryDependencyMock = jest.fn<IPartnerRepository, PartnerDTO[]>(() => ({
  async findAll(): Promise<PartnerDTO[]> {
    const result = await new Promise<PartnerDTO[]>((resolve) => resolve(sourceCustomerRepo));

    return result;
  },
  async findByQuery(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO[]> {
    const result = await new Promise<PartnerDTO[]>(
      (resolve) => resolve(sourceCustomerRepo.filter(predicate)),
    );

    return result;
  },
  async findSpecific(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO> {
    const result = await new Promise<PartnerDTO>(
      (resolve) => resolve(sourceCustomerRepo.find(predicate) ?? null),
    );

    return result;
  },
}));

const partnerRepositoryDependencyMock = PartnerRepositoryDependencyMock();

export default {
  sourceCustomerRepo,
  partnerRepositoryDependencyMock,
};
