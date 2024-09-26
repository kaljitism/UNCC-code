const http = require('node:http');

const server = http.createServer();

server.listen(8050, () => {
  console.log('Server listening on http://localhost:8050');
});

server.on('request', (request) => {
  
  console.log('-------- METHOD --------');
  console.log(request.method);
  
  console.log('\n-------- URL --------');
  console.log(request.url);
  
  console.log('\n-------- HEADERS --------');
  console.log(request.headers);
  
  // console.log('-------- BODY --------');
  // console.log(request.body); // Loads body into memory, not efficient
  
  request.on('data', chunk => {
    console.log(chunk.toString());
  });
});

