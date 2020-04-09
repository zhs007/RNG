docker stop serv
docker rm serv
docker run -d --name serv -p 3000:3000 rng pm2-docker start /app/bin/serv.js -i 0