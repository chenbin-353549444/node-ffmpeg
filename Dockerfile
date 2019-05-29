FROM node:8

RUN apt-get update \
    && apt-get install -y ffmpeg

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm cache clean --force \
    && npm install

COPY . /usr/src/app

CMD ["npm","start"]
