## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.7

This is a NestJS project that uses a hexagonal architecture, DDD: Domain Driven Design, TDD: Test Driven Design, Mikro ORM as ORM for the database in MongoDB and Swagger to document all the endpoints.

## Docker

You must have docker and docker-compose installed on your computer

from the root of the project execute the following commands in order

docker-compose up -d --build

that's for user creation, after that you can already quit the bash and use the API

## Installation witouht docker

```bash
$ yarn install
```

## Running the app witouht docker

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch


## License

Nest is [MIT licensed](LICENSE).
