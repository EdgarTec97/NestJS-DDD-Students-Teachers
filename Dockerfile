FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY ./yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --frozen-lockfile --production

FROM node:lts-alpine as production

ENV NODE_ENV production

ARG GIT_HASH
ENV GIT_HASH $GIT_HASH

WORKDIR /app

COPY . .

COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist

EXPOSE 4000

CMD node ./dist/main.js