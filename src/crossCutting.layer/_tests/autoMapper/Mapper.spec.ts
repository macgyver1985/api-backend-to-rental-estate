import { Mapper } from '@layer/crossCutting/autoMapper';

describe('Test Mapper', () => {
  it('Mapper de entidades semelhantes sem forMember', () => {
    type FirstType = {
      name: string,
      year: number
    };
    type SecondType = {
      name: string,
      year: number
    };

    const mapper = new Mapper<FirstType, SecondType>();
    const firstDTO: FirstType = {
      name: 'Teste',
      year: 35,
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    mapper.map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual(firstDTO.name);
    expect(secondDTO.year).toEqual(firstDTO.year);
  });

  it('Mapper de entidades distintas sem forMember', () => {
    type FirstType = {
      nome: string,
      idade: number
    };
    type SecondType = {
      name: string,
      year: number
    };

    const mapper = new Mapper<FirstType, SecondType>();
    const firstDTO: FirstType = {
      nome: 'Teste',
      idade: 35,
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    mapper.map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual('');
    expect(secondDTO.year).toEqual(0);
    expect(secondDTO.name).not.toEqual(firstDTO.nome);
    expect(secondDTO.year).not.toEqual(firstDTO.idade);
  });

  it('Mapper de entidades distintas com forMember', () => {
    type FirstType = {
      nome: string,
      idade: number
    };
    type SecondType = {
      name: string,
      year: number
    };

    const mapper = new Mapper<FirstType, SecondType>();
    const firstDTO: FirstType = {
      nome: 'Teste',
      idade: 35,
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    mapper
      .forMember('name', (t) => t.nome)
      .forMember('year', (t) => t.idade)
      .map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual(firstDTO.nome);
    expect(secondDTO.year).toEqual(firstDTO.idade);
  });
});
