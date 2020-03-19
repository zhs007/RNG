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

3. generate binary format RNG output files.

``` sh
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rnga.js
```

4. generate txt format RNG output file (for each scaling range).

``` sh
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rngb.js
```

### About libfortuna

libfortuna uses code from the [PostgreSQL](http://www.postgres.org/) database project.

The original source location (in the postgres source tree) is contrib/pgcrypto. Also, parts of src/include/postgres.h and src/include/c.h.

### About libfortunajs

[libfortunajs](https://github.com/zhs007/libfortunajs) is a nodejs c++ addon project. 

This library can be compiled with [node-gyp](https://github.com/nodejs/node-gyp) .

[libfortunajs](https://github.com/zhs007/libfortunajs) export some functions, which in our game only use ```randomInt``` .

### Install or Compile libfortunajs

[libfortunajs](https://github.com/zhs007/libfortunajs) has been publish to [npm](https://www.npmjs.com/) , all projects base nodejs can be download source code to compile and use.

```
npm i libfortuna --save
``` 

Nodejs version 8.x is recommended.

[libfortunajs](https://github.com/zhs007/libfortunajs) compile with [node-gyp](https://github.com/nodejs/node-gyp) .

except nodejs, you need to python 2.x, gcc 4.9 (on linux), and on mac osx also need xcode, on windows recommended to [node-gyp](https://github.com/nodejs/node-gyp) installation instructions.

### Samples

``` js
const libfortuna = require('libfortuna');

function randomInt(max) {
    return libfortuna.randomInt(max);
}

exports.randomInt = randomInt;
```

When the actual game wheel is random, we call it this way

``` js
for (let ii = 0; ii < this.axisnums; ++ii) {
    lstLastSymbol[ii] = base.randomInt(lstSymbol[ii].length);
}
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
