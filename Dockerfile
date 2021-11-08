FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

ENV NODE_ENV=production
ENV BUILD=ts

CMD ["node", "dist/main"]