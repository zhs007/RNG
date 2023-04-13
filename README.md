# RNG

### About RNG

This is a node.js project.  
The core is written in c, so you need to compile with ``node-gyp``, you need install gcc (>= 4.9), python (2.7 or >= 3.6).  

In order to ensure the consistent output of sha1sum, we provide a dockerfile. In the case that all dependencies are consistent, we can get the same hash.

If you use windows, you must use docker and need to switch docker to the linux container.

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

The results are in the output directory.

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

for (let ii = 0; ii < this.axisnums; ++ii) {
    lstLastSymbol[ii] = libfortuna.randomInt(lstSymbol[ii].length);
}
```

### Source

core library:
libfortunajs-1.2.15.tar.gz

grpc server:
rngserv.zip

### Binary hash

The binary file compiled by the rng library is `/app/node_modules/libfortuna/build/Release/fortuna.node`.  
The sha1sum of the iTech certificate record is `f5b667f2cbde7e0045f7fcd1260c8dfa453ae841`.

Because our core library needs to be compiled in c++, the result will be different under different operating systems, you need to use the script we provide under linux to get the exact same hashcode.


### List of scaling ranges

The scaling ranges source

```
// randomInt(max)
// return [0, max)
void randomInt(const Nan::FunctionCallbackInfo<v8::Value>& info) {
    if (info.Length() != 1) {
        Nan::ThrowTypeError("randomInt: Wrong number of arguments.");

        return;
    }

    if (!info[0]->IsNumber()) {
        Nan::ThrowTypeError("randomInt: Wrong arguments.");

        return;
    }

    v8::Local<v8::Number> max = info[0].As<v8::Number>();
    if (max->Value() <= 0) {
        Nan::ThrowTypeError("randomInt: Invalid max velue.");
        
        return;
    }

    unsigned int maxval = (unsigned int)max->Value();

    unsigned int cr = 0;
    unsigned long long MAX_RANGE = ((unsigned long long)1) << 32;
    unsigned long long limit = MAX_RANGE - (MAX_RANGE % maxval);
    
    do {
        fortuna_get_bytes(4, (uint8*)&cr);
    } while (cr >= limit);
    
    v8::Local<v8::Number> num = Nan::New<v8::Number>(cr % maxval);
    info.GetReturnValue().Set(num);
}
```

The sample is

```
38, 34, 36, 69, 50, 6, 9
```



```
const libfortuna = require('libfortuna');
const fs = require('fs');

const SCALING_RANGES = [38, 34, 36, 69, 50, 6, 9];
const MAX_NUMBER = 10000000;
const BUF_LENGTH = 10000;

/**
 * genFile - Generate a file for rng
 * @param {string} fn - This is the file name of the output file
 * @param {int} range - This is the range of random numbers that need to be generated
 * @param {int} max - This is the number of random numbers that need to be generated
 */
function genFile(fn, range, max) {
  const fd = fs.openSync(fn, 'w');

  let buf = '';
  let i = 0;
  for (; i < max; ++i) {
    const n = libfortuna.randomInt(range);
    buf += n.toString() + '\r\n';
    if (i % BUF_LENGTH == 0) {
      fs.writeSync(fd, buf, -1, 'utf-8');
      buf = '';
    }
  }

  if ((i - 1) / BUF_LENGTH != 0) {
    fs.writeSync(fd, buf, -1, 'utf-8');
  }

  fs.closeSync(fd);
}

for (let i = 0; i < SCALING_RANGES.length; ++i) {
  const fn = 'rng_b_' + SCALING_RANGES[i] + '.txt';
  genFile(fn, SCALING_RANGES[i], MAX_NUMBER);

  console.log('generate ' + fn + ' ok.');
}
```


If you use another development language, you need to process the rng scale yourself, here is an example of golang.

```
	maxval := int64(r)

	cr := 0
	MAX_RANGE := int64(1) << 32
	limit := MAX_RANGE - (MAX_RANGE % maxval)

	for {
		cr = int(plugin.Rngs[0])
		plugin.Rngs = plugin.Rngs[1:]

		if int64(cr) < limit {
			break
		}
	}

	v := cr % r
```    