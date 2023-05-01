<!-- GETTING STARTED -->

## Stages

- Create infra-uhuu network
- Build all
- Run docker-compose

This is an example of how to list things you need to use the api-uhuu and how to install them.

### directory path

- /beers-styles

```sh
#beers-styles
docker network create -d bridge --subnet  172.18.0.1/16 --gateway  172.18.0.1 beers-infra


#build backend
unset BUILD_ENV; export BUILD_ENV=local; bash -c 'docker build -t backend:$BUILD_ENV -f backend/devops/$BUILD_ENV.Dockerfile ./backend'


#Run docker-compose
unset BUILD_ENV; export BUILD_ENV=local; docker-compose -f devops/docker-compose.infra.yml --env-file=devops/.env up -d \
&& unset BUILD_ENV; export BUILD_ENV=local; docker-compose -f devops/docker-compose.app.yml --env-file=devops/.env up -d
```

## Now just open

```sh
#back-end
http://localhost:3000/

#API Documentation
http://localhost:3000/api

```
