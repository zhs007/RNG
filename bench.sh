docker stop bench
docker rm bench
docker run -it --name bench --link serv:serv rng websocket-bench -a 10000 -c 500 -m 10 -t primus -p websockets -g /app/bin/client.js ws://serv:3000