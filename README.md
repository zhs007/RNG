# RNG

### About RNG

This is a node.js project.  
The core is written in c, so you need to compile with ``node-gyp``, you need install gcc (>= 4.9), python (2.7 or >= 3.6).  

In order to ensure the consistent output of sha1sum, we provide a dockerfile. In the case that all dependencies are consistent, we can get the same hash.

If you use windows, you need to switch docker to the linux container.

### How to use

1. build docker.

``` sh
docker build -t rng .
```

2. generate binary hash.

``` sh
docker stop rng
docker rm rng
docker run -it --name rng rng sha1sum /app/node_modules/libfortuna/build/Release/fortuna.node
```

3. generate binary format file.

``` sh
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rnga.js
```

3. generate txt format file.

``` sh
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rngb.js
```

### Source

libfortunajs-1.2.15.tar.gz

### Binary hash

The binary file compiled by the rng library is `/app/node_modules/libfortuna/build/Release/fortuna.node`.  
The sha1sum of the iTech certificate record is `f5b667f2cbde7e0045f7fcd1260c8dfa453ae841`.


### List of scaling ranges

```
38, 34, 36, 69, 50, 6, 9
```

### Binary format file

rnga.zip

### TXT format file.

rngb.zip