const http = require('node:http');

const server = http.createServer();

server.listen(8050, () => {
  console.log('Server listening on http://localhost:8050');
});

server.on('request', (request, response) => {
  
  console.log('-------- METHOD --------');
  console.log(request.method);
  
  console.log('\n-------- URL --------');
  console.log(request.url);
  
  console.log('\n-------- HEADERS --------');
  console.log(request.headers);
  
  // console.log('-------- BODY --------');
  // console.log(request.body); // Loads body into memory, not efficient
  
  const name = request.headers.name;
  let data = '';
  
  request.on('data', chunk => {
    data += chunk.toString();
  });
  
  request.on('end', () => {
    data = JSON.parse(data);
    console.log(data);
    console.log(name);
    
    response.setHeader('customHeaderName', 'customHeaderValue');
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    console.log('Sending Response...');
    response.end(
        JSON.stringify({message: `Post with title '${data.title}' was created`}));
  });
  
  request.on('close', () => {
    console.log('\n[Request Closed]\n');
  });
  
  request.on('error', err => {
    console.log(err.toString());
  });
});

