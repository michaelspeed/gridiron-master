FROM node:14-alpine AS BUILD_IMAGE

RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

RUN /usr/local/bin/node-prune

FROM node:14-alpine

RUN npm install -g concurrently

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/apps ./apps
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json package.json
COPY --from=BUILD_IMAGE /app/tsconfig.json tsconfig.json
COPY --from=BUILD_IMAGE /app/tsconfig.build.json tsconfig.build.json
COPY --from=BUILD_IMAGE /app/webpack.config.js webpack.config.js
COPY --from=BUILD_IMAGE /app/nest-cli.json nest-cli.json
COPY --from=BUILD_IMAGE /app/shop.graphql shop.graphql
COPY --from=BUILD_IMAGE /app/admin.gql admin.gql

EXPOSE 3000 5588 5002 3020

CMD npm run launch
