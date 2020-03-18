FROM node:10

RUN npm i node-gyp -g -d

COPY ./package*.json /app/

RUN cd /app \
    && npm i -d

COPY . /app

WORKDIR /app