FROM node:14.17.0-alpine3.13

# Create app directory
WORKDIR /usr/src/app

COPY . ./

COPY package*.json ./

RUN yarn cache clean
RUN yarn install

EXPOSE 4000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD yarn && /wait && yarn watch:dev
