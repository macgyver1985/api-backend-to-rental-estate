import { AutoMapper } from '@layer/crossCutting/autoMapper';

describe('Test AutoMapper', () => {
  it('AutoMapper de entidades semelhantes sem forMember', () => {
    type FirstType = {
      name: string,
      year: number
    };
    type SecondType = {
      name: string,
      year: number
    };

    const autoMapper = new AutoMapper();

    autoMapper.createMap<FirstType, SecondType>(
      Symbol.for('FirstType'),
      Symbol.for('SecondType'),
    );

    const firstDTO: FirstType = {
      name: 'Teste',
      year: 35,
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    autoMapper.mapper<FirstType, SecondType>(Symbol.for('FirstType'), Symbol.for('SecondType'))
      .map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual(firstDTO.name);
    expect(secondDTO.year).toEqual(firstDTO.year);
  });

  it('AutoMapper de entidades distintas sem forMember', () => {
    type FirstType = {
      nome: string,
      idade: number
    };
    type SecondType = {
      name: string,
      year: number
    };

    const autoMapper = new AutoMapper();

    autoMapper.createMap<FirstType, SecondType>(
      Symbol.for('FirstType'),
      Symbol.for('SecondType'),
    );

    const firstDTO: FirstType = {
      nome: 'Teste',
      idade: 35,
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    autoMapper.mapper<FirstType, SecondType>(Symbol.for('FirstType'), Symbol.for('SecondType'))
      .map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual('');
    expect(secondDTO.year).toEqual(0);
    expect(secondDTO.name).not.toEqual(firstDTO.nome);
    expect(secondDTO.year).not.toEqual(firstDTO.idade);
  });

  it('AutoMapper de entidades distintas com forMember', () => {
    type FirstType = {
      nome: string,
      idade: string
    };
    type SecondType = {
      name: string,
      year: number
    };

    const autoMapper = new AutoMapper();

    autoMapper.createMap<FirstType, SecondType>(
      Symbol.for('FirstType'),
      Symbol.for('SecondType'),
    )
      .forMember('name', (t) => t.nome)
      .forMember('year', (t) => Number(t.idade));

    const firstDTO: FirstType = {
      nome: 'Teste',
      idade: '35',
    };
    const secondDTO: SecondType = {
      name: '',
      year: 0,
    };

    autoMapper.mapper<FirstType, SecondType>(Symbol.for('FirstType'), Symbol.for('SecondType'))
      .map(firstDTO, secondDTO);

    expect(secondDTO.name).toEqual(firstDTO.nome);
    expect(secondDTO.year).toEqual(Number(firstDTO.idade));
  });
});
