const net = require('node:net');

const socket = net.createConnection({
      host: 'localhost',
      port: 8051,
    }, () => {
      const request = Buffer.from(
          '504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a5472616e736665722d456e636f64696e673a206368756e6b65640d0a6e616d653a20617574686f72697a6564557365720d0a486f73743a206c6f63616c686f73743a383035310d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a0d0a',
      );
      socket.write(request);
    },
);

socket.on('data', (chunk) => {
  console.log('[Received Response]:');
  console.log(chunk.toString());
  socket.end();
});

socket.on('end', () => {
  console.log('[Connection Closed]');
});
