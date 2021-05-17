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
```json
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

### Técnologias

- Liguagem de programação NodeJS com TypeScript.
- Controle de acesso por meio de Token JWT.
- GraphQL para dar autonomia ao consumidor de quais dados deseja receber.
- Apollo Server e Express para construção da camada de APIs.