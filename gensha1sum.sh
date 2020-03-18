docker stop rng
docker rm rng
docker run -it --name rng rng sha1sum /app/node_modules/libfortuna/build/Release/fortuna.node