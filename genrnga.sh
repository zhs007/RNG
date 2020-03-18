mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rnga.js