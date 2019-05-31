#!/bin/bash

(docker stop node-ffmpeg && echo "stop success") || echo "stop error";

(docker rm node-ffmpeg && echo "remove success") || echo "remove error";

docker build -t node-ffmpeg .;

docker run -d --name node-ffmpeg -p 80:80 node-ffmpeg;

(docker rmi $(docker images -aq -f "dangling=true") && echo "clean success") || echo "clean error";
