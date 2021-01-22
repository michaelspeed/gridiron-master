FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-alpine

RUN npm install -g concurrently

WORKDIR /app

COPY --from=BUILD_IMAGE /app/ ./

RUN rm -rf node_modules

RUN rm -rf libs

RUN rm -rf templates

RUN yarn --frozen-lockfile

EXPOSE 3000 5588 5002 3020

CMD npm run launch
