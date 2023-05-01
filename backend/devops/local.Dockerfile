FROM node:16-alpine AS base
RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk add bash
RUN yarn global add @nestjs/cli

WORKDIR /app
COPY --chown=node:node . .

RUN rm -rf dist

RUN mkdir dist

RUN chown -R node ./dist

COPY package.json package-lock.json ./
RUN npm i --frozen-lockfile
EXPOSE 3000 9229
USER node
CMD ["npm", "run", "start:debug" ]