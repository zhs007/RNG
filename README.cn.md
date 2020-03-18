# RNG

### 关于

这是一个Node.js项目，rng核心代码是c++的，所以需要使用node-gyp编译，依赖较多，而且版本不一致的话，会导致编译出来的文件hash不一致，所以我们建议用docker。  
注意在 windows 下，需要使用 linux 内核。

### 如何使用

1. build docker.

``` bash
docker build -t rng .
```

2. generate binary hash.

``` bash
docker stop rng
docker rm rng
docker run -it --name rng rng sha1sum /app/node_modules/libfortuna/build/Release/fortuna.node
```

3. 输出 4个 10mb 的二进制文件

``` bash
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rnga.js
```

4. 输出随机数的文本文件

``` bash
mkdir output
docker stop rng
docker rm rng
docker run -it --name rng -v $PWD/output:/app/output rng node /app/bin/rngb.js
```

### 源代码

libfortunajs-1.2.15.tar.gz

### 二进制hash

rng的库编译出来的目标文件是 ``/app/node_modules/libfortuna/build/Release/fortuna.node`` 。  
iTech证书记录的 sha1sum 是 ``f5b667f2cbde7e0045f7fcd1260c8dfa453ae841`` 。

### 随机数范围列表

```
38, 34, 36, 69, 50, 6, 9
```

### 二进制随机数文件

rnga.zip

### 文本方式随机数文件

rngb.zip