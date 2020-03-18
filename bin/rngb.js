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
