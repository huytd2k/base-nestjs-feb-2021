## Installation

```bash
$ yarn 
```

## Running docker database based on `.env` file
$ docker-compose -f docker-compose.dev.yaml up -d
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

## TODO:
- [x] Config service
- [ ] Lint, format
- [x] Swagger Docs
- [x] Dockerfile for databases
- [x] Logging
- [x] Database migration
- [ ] Utils
- [x] Auth
- [ ] Exception Filter
- [ ] File Upload


