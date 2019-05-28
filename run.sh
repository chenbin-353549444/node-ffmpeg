#!/bin/bash

(docker stop pwa && echo "stop success") || echo "stop error";

(docker rm pwa && echo "remove success") || echo "remove error";

docker build -t node-ffmpeg .;

docker run -d --name node-ffmpeg -p 7777:7777 node-ffmpeg;

(docker rmi $(docker images -aq -f "dangling=true") && echo "clean success") || echo "clean error";
