module.exports = {
  /**
   * Before connection (optional, just for faye)
   * @param {client} client connection
   */
  beforeConnect: function(client) {
    // Example:
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
  },

  /**
   * On client connection (required)
   * @param {client} client connection
   * @param {function} done - callback function(err) {}
   */
  onConnect: function(client, done) {
    // Faye client
    // client.subscribe('/channel', function(message) { });

    // Socket.io client
    // client.emit('', {});

    // Primus client
    client.write('rng');

    // WAMP session
    // client.subscribe('com.myapp.hello').then(function(args) { });

    done();
  },

  /**
   * Send a message (required)
   * @param {client} client connection
   * @param {function} done callback function(err) {}
   */
  sendMessage: function(client, done) {
    // Example:
    // client.emit('', {});
    // client.publish('/test', { hello: 'world' });
    // client.call('com.myapp.add2', [2, 3]).then(function (res) { });

    client.write('rng');

    done();
  },

  /**
   * WAMP connection options
   */
  options: {
    // realm: 'chat'
  },
};
