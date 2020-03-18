const libfortuna = require('libfortuna');
const fs = require('fs');

const BUF_LENGTH = 10 * 1024 * 1024;

/**
 * genFile - Generate a file for rng
 * @param {string} fn - This is the file name of the output file
 * @param {int} buflen - This is the length of buffer that need to be generated
 */
function genFile(fn, buflen) {
  const fd = fs.openSync(fn, 'w');

  const buf = libfortuna.randomBuf(buflen);
  console.log(buf.length);
  fs.writeSync(fd, buf, 0, buf.length, 0);

  fs.closeSync(fd);
}

for (let i = 0; i < 4; ++i) {
  const fn = 'rng_a_' + i + '.binrng';
  genFile(fn, BUF_LENGTH);

  console.log('generate ' + fn + ' ok.');
}
