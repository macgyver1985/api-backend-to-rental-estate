import ServiceToObtainRealEstate from '@layer/adapters/services';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets';

describe('Test ServiceToObtainRealEstate', () => {
  const service: IServiceToObtainRealEstate = new ServiceToObtainRealEstate();

  it('Busca stream com sucesso', async () => {
    const result = await (await service.obtainOnDemand())
      .nextIndex(1000, 10);

    console.log('result', result);

    expect(true).toEqual(true);
  });
});
