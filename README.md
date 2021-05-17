# API ENG-ZAP-CHALLENGE-TYPESCRIPT

## Desafio Escolhido

- Opção B: Fazer uma API (backend)

## Requisitos Funcionais

A API deve retornar a lista de imóveis habilitados para cada portal (ZAP e Viva Real).

##### Regras para ambos os portais:
- Caso os atributos "lat" e "lon" sejam iguais a zero o imóvel não deve ser exibido em nenhum dos portais.

##### Regras Potal Zap:

###### Imóveis para locação

- O valor mínimo deve ser R$ 3.500,00.

###### Imóveis para venda

- O valor mínimo deve ser R$ 600.000,00.
- O metro quadrado "usableAreas" deve ser maior do que 0.
- O preço do metro quadrado deve ser maior que R$ 3.500,00.
- Caso o imóvel esteja dentro do "bounding box" abaixo, o valor mínimo passa a ser R$ 540.000,00.
	minlon: -46.693419.
	minlat -23.568704.
	maxlon: -46.641146.
	maxlat: -23.546686.

##### Regras Potal Viva Real:

###### Imóveis para locação

- O valor máximo deve ser R$ 4.000,00.
- Caso o imóvel esteja dentro do bounding box do Potal ZAP o valor máximo do aluguel passa a ser R$ 6.000,00.
- O valor de condomínio "monthlyCondoFee" deve ser numérico e menor que 30% do valor do aluguel.

###### Imóveis para venda

- O valor máximo deve ser R$ 700.000,00.

## Requisitos Não Funcionais

- Faça essa API pensando que ela pode ser consumida por vários tipos de clientes e com diferentes propósitos.
- Os dados devem ser trabalhados em memória não sendo permitido usar qualquer tipo de banco de dados.
- Usar um dos sources abaixo:
	- http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-2.json
	- http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-2
- O metadados de resposta deve conter os campos abaixo:
```
{
	pageNumber: int32,
	pageSize: int32,
	totalCount: int32,
	listings: [
		...
	]
}
```

## Propósta Técnica

### Arquitetura

- Clean Architecture.
- Paradigma Orientado a Objetos.
- Dependency Injection.
- SOLID
- Design Patterns GoF

### Técnologias

- Liguagem de programação NodeJS com TypeScript.
- Controle de acesso por meio de Token JWT.
- GraphQL para dar autonomia ao consumidor de quais dados deseja receber.
- Apollo Server e Express para construção da camada de APIs.

## Detalhamento da Solução

Visando atender de uma melhor forma os aspectos de "organização, manutenibilidade, rastreabilidade, testabilidade, performance e portabilidade" toda estrutura da aplicações foi baseada em Clean Architecture, abaixo diagrama conceitual dessa proposta:
<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/CleanArchitecture.png" alt="Clean Architecture" width="600">

### Estrutura das Pastas

```
    ├── src                    		# Código Fonte
		|── crossCutting.layer		# Bibliotecas e recursos que são usados por todas as camadas da aplicação
		   	└── _tests				# Testes unitários isolados usando MOCKs para integrações
       	|── domain.layer			# Entidades do domínio do negócio
		   	└── _tests				# Testes unitários isolados usando MOCKs para integrações
       	|── application.layer		# Contém a implementação dos casos de uso e fornece os sockets aos adaptadores
		   	└── _tests				# Testes unitários isolados usando MOCKs para integrações
		|── adapters.layer			# Implementação dos sockets demandados pela camada de application
		   	└── _tests				# Testes unitários isolados usando MOCKs para integrações
       	|── presentations.layer		# Controllers para fazer abstração ao framework de APIs
		   	└── _tests				# Testes unitários integrados
       	├── main.layer				# Configurações de IoC, framework de APIs e startup da aplicação
		└── settings.layer			# Configurações para os ambientes (local, test, develop, production)
```

### Pastas X Clean Architecture

Abaixo tabela que mostra a qual camada da arquitetura que cada pasta pertence:

| Pasta | Camada |
| ------ | ------ |
| crossCutting.layer | Transversal |
| domain.layer | Enterprise Business Rule |
| application.layer | Application Business Rule |
| adapters.layer | Interface Adapters |
| presentations.layer | Interface Adapters |
| main.layer | Frameworks & Drivers |
| settings.layer | Transversal |

## Configurando Ambiente Local

#### Pré-requisitos

Para que a aplicação seja executada corretamente deve ser instalado os recursos abaixo:

- NodeJS
- NPM

#### Repositório
```bash
$ git clone https://github.com/macgyver1985/eng-zap-challenge-typescript.git
$ cd eng-zap-challenge-typescript
```

#### Dependencias

```bash
$ npm install
```

#### Transpilando

Este comando irá converter o código de **typescript** para **javascript** e salvar na pasta **dist**.
 
```bash
$ npm run build
```

#### Iniciando

```bash
$ npm start
```
