const net = require('net');

const hexResponse = '7b226d657373616765223a22506f73742077697468207469746c6520274461727427207761732063726561746564227d';

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('\n          [Received Request]');
    console.log(data.toString());
  });
  
  socket.on('end', () => {
    console.log('\n          [Request Closed]');
  });
  
  const response = Buffer.from(hexResponse, 'hex');
  socket.write(response);
});

server.listen(8000, 'localhost', () => {
  console.log('TCP Server listening on', server.address());
});
