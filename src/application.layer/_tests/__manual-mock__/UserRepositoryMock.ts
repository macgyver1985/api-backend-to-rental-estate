import { IUserRepository } from '@layer/application/interfaces/sockets/repositories';
import UserDTO from '@layer/application/models/accessControl';

const sourceCustomerRepo: UserDTO[] = [{
  id: 'c7624b5b-2dce-4917-b9aa-b938a96bfbd5',
  userName: 'imoveiscomuser',
  password: 'imoveiscompwd',
  partnerId: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
},
{
  id: '279498c9-1fa7-469f-b6d6-b2b600654256',
  userName: 'prontoparamoraruser',
  password: 'prontoparamorarpwd',
  partnerId: '142ce1dd-64da-40ab-9458-0c3f88a5fa6a',
}];

const UserRepositoryMock = jest.fn<IUserRepository, unknown[]>(() => ({
  findAll: async (): Promise<UserDTO[]> => {
    const result = await new Promise<UserDTO[]>((resolve) => resolve(sourceCustomerRepo));

    return result;
  },
  findByQuery: async (
    predicate: (item: UserDTO) => boolean,
  ): Promise<UserDTO[]> => {
    const result = await new Promise<UserDTO[]>(
      (resolve) => resolve(sourceCustomerRepo.filter(predicate)),
    );

    return result;
  },
  findSpecific: async (
    predicate: (item: UserDTO) => boolean,
  ): Promise<UserDTO> => {
    const result = await new Promise<UserDTO>(
      (resolve) => resolve(sourceCustomerRepo.find(predicate) ?? null),
    );

    return result;
  },
}));

export default UserRepositoryMock;
