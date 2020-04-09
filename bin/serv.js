const libfortuna = require('libfortuna');
const WebSocketServer = require('ws').Server;

const SERV_PORT = 3000;

/**
 * sleep - await sleep()
 * @param {int} ms - sleep time
 * @return {Promise} ret - Promise
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Serv - RNG test server
 */
class Serv {
  /**
   * plugins manager
   * @constructor
   */
  constructor() {
    this.wss = new WebSocketServer({
      host: '0.0.0.0',
      port: SERV_PORT,
    });

    this.userid = 0;
    this.curusernums = 0;

    this.wss.on('connection', (ws, req) => {
      const myuid = this.userid++;
      this.curusernums++;

      console.log('user ' + myuid + ' connected.');

      ws.on('message', (message) => {
        // sleep(100).then(() => {
        const n = libfortuna.randomInt(100);
        ws.send(n.toString());
        // });
      });

      ws.on('close', (code, message) => {
        console.log('user ' + myuid + ' disconnected.');

        this.curusernums--;
      });

      ws.on('error', (error) => {
        console.log('user ' + myuid + ' get error.');
      });
    });
  }
}

new Serv();
