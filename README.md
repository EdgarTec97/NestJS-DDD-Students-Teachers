You must have docker and docker-compose installed on your computer

from the root of the project execute the following commands in order

docker-compose up -d --build

docker exec -it mongodb bash

mongo -u root -p root

db.getSiblingDB('challenge').createUser({user: 'root', pwd: 'root', roles: [{role: 'dbAdmin', db: 'challenge'},{role: 'dbOwner', db: 'challenge'},{role: 'userAdmin', db: 'challenge'}], mechanisms:[ "SCRAM-SHA-1"] });

wait 5-10 seconds

that's for user creation, after that you can already quit the bash and use the API

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

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
