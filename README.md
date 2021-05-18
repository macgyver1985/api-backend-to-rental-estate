# API ENG-ZAP-CHALLENGE-TYPESCRIPT

# Indice

  - [Desafio Escolhido](#desafio-escolhido)
  - [Requisitos Funcionais](#requisitos-funcionais)
  - [Requisitos Não Funcionais](#requisitos-não-funcionais)
  - [Propósta Técnica](#propósta-técnica)
  - [Detalhamento da Solução](#detalhamento-da-solução)
  - [Configurando Ambientes](#configurando-ambientes)
  - [Executando Aplicação](#executando-aplicação)

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
	- minlon: -46.693419.
	- minlat -23.568704.
	- maxlon: -46.641146.
	- maxlat: -23.546686.

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
- Jest para testes e relatório de cobertura.

## Detalhamento da Solução

Visando atender de uma melhor forma os aspectos de "organização, manutenibilidade, rastreabilidade, testabilidade, performance e portabilidade" toda estrutura da aplicações foi baseada em Clean Architecture, abaixo diagrama conceitual dessa proposta:

<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/clean-architecture.png" alt="Clean Architecture" width="600">

### Estrutura das Pastas

```
	├── src                    	# Código Fonte
	|── crossCutting.layer		# Bibliotecas e recursos que são usados por todas as camadas da aplicação
		└── _tests		# Testes unitários isolados usando MOCKs para integrações
       	|── domain.layer		# Entidades do domínio do negócio
		└── _tests		# Testes unitários isolados usando MOCKs para integrações
       	|── application.layer		# Contém a implementação dos casos de uso e fornece os sockets aos adaptadores
		└── _tests		# Testes unitários isolados usando MOCKs para integrações
	|── adapters.layer		# Implementação dos sockets demandados pela camada de application
		└── _tests		# Testes unitários isolados usando MOCKs para integrações
       	|── presentations.layer		# Controllers para fazer abstração ao framework de APIs
		└── _tests		# Testes unitários integrados
       	├── main.layer			# Configurações de IoC, framework de APIs e startup da aplicação
	└── settings.layer		# Configurações para os ambientes (local, test, develop, production)
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

### Metadados de Resposta

Abaixo tabela com os atributos do metadados e qual o dados que é apresentado em cada um:

| Atributo | Descrição |
| ------ | ------ |
| pageNumber | Número da página atual |
| pageSize | Quantidade de registros por página |
| totalPages | Total de páginas existentes |
| totalCount | Quantidade total de registros |
| listings | Lista dos imoveis da pagina atual |

# Configurando Ambientes

## Pré-requisitos

Para que a aplicação seja executada corretamente deve ser instalado os recursos abaixo:

- NodeJS
- NPM
- Docker

## Ambiente de Desenvolvimento

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

#### Iniciando sem Debug

```bash
$ npm start
```

> Será executada no endereço http://localhost:3333/graphql

#### Iniciando com Debug

Basta abrir a pasta "eng-zap-challenge-typescript" pelo Visual Studio Code e executar o comando abaixo no terminal:

```bash
$ npm run dev
```
> Será executada no endereço http://localhost:3333/graphql

Em seguida é só colocar o break point nos pontos que deseja debugar, veja exemplo abaixo:

<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/debug-example.jpg" alt="Exemplo de debug" width="800">

#### Execução dos Testes

Este comando irá executar os teste e disponibulizar o relatório de cobertura na pasta **coverage**.

```bash
$ npm test
```

## Publicando em Docker

A aplicação está preparada para ser executada em container.

Caso o ***npm run publish*** já tenha sido executado, execute os comandos abaixo:

```bash
$ docker stop -t 0 macgyver_application
$ docker rm macgyver_application
$ docker rmi macgyver1985/engzap
```

Para publicar no container execute o comando abaixo:

```bash
$ npm run publish
```

> Será executada no endereço http://localhost:3333/graphql

Caso queria subir a imagem da aplicação manualmente execute os comandos abaixo:

```bash
$ npm run build
$ docker build -f Dockerfile -t macgyver1985/engzap .
$ docker run -d -e NODE_ENV=production -p 3333:3333 macgyver1985/engzap
```

> Será executada no endereço http://localhost:3333/graphql

# Executando Aplicação

As opções descritas abaixo servem para instânicas da aplicação em ambiente local ou container.

### Usuários

Foram configurados dois usuários, onde uma está atralado ao Portal ZAP e o outro ao Viva Real.
Para ter acesso aos imóveis disponíveis a cada portal basta gerar o token JWT com os respectivos usuários.

###### Viva Real

- Username: **vivarealuser**
- Password: **vivarealpwd**

###### Portal ZAP

- Username: **zapuser**
- Password: **zappwd**

### Apollo Playground

Excelente forma de efetuar requisições à API pois já fornece toda a documentação dos "SCHEMAS" e ajuda muito na construção das chamadas do tipo "Mutation ou Query".

<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/apollo-playground-example.jpg" alt="Apollo Playground" width="800">

##### Obter Token JWT

- Acesso a url http://localhost:3333/graphql
- Execute a mutation GetAuthorization

```
mutation{
  GetAuthorization (
    command: {
      userName: "zapuser"
      password: "zappwd"
    }
  ) {
    authorization,
    expiresIn
  }
}
```

<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/get-token-example.jpg" alt="Exemplo de Token JWT" width="800">

##### Obter Lista de Imoveis

- Acesso a url http://localhost:3333/graphql
- Execute a query obtainRealEstate informando quais campos deseja receber

```
query {
  obtainRealEstate(
    command:{
      pageNumber: 1,
      pageSize: 10
    }) {
    pageNumber
    pageSize
    totalPages
    totalCount
    listings {
      id
      usableAreas
      bathrooms
      bedrooms
      createdAt
      updatedAt
      listingType
      listingStatus
      parkingSpaces
      owner
      images
      address {
        city
        neighborhood
        geoLocation{
          precision
          location{
            lon
            lat
          }
        }
      }
      pricingInfos {
        businessType
        price
        period
        yearlyIptu
        monthlyCondoFee
        rentalTotalPrice
      }
    }
  }
}
```

- Configura o token em HTTP HEADERS incluindo o parâmetro "authorization"

```
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOiJ7XCJ1c2VyTmFtZVwiOlwidml2YXJlYWx1c2VyXCIsXCJ1c2VySWRcIjpcIjI3OTQ5OGM5LTFmYTctNDY5Zi1iNmQ2LWIyYjYwMDY1NDI1NlwifSIsImNyZWF0ZWREYXRlIjoiMjAyMS0wNS0xOFQwNTowNDo0NS42ODRaIiwiZXhwaXJlc0RhdGUiOiIyMDIxLTA1LTE4VDA2OjA0OjQ1LjY4NFoiLCJleHBpcmVzSW4iOjM2MDAwMDAsImlkZW50aXR5IjoiMTQyY2UxZGQtNjRkYS00MGFiLTk0NTgtMGMzZjg4YTVmYTZhIiwiaWF0IjoxNjIxMzE0Mjg1LCJleHAiOjE2MjEzMTc4ODV9.-G_ShzMbwYN5kZgJWoDdc92kIxXuvmJ2ajf93D479QU"
}
```

<img src="https://github.com/macgyver1985/eng-zap-challenge-typescript/blob/master/docs/obtain-real-etates-example.jpg" alt="Exemplo de Obter Imoveis" width="800">

