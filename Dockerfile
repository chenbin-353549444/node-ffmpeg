FROM node:8

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm cache clean --force \
    && npm install

COPY . /usr/src/app

CMD ["npm","start"]