const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  ws.send('');
});

ws.on('message', (msg) => {
  console.log(msg);

  process.exit();
});
