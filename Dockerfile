FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000 5588 5002 3020

CMD npm run launch
