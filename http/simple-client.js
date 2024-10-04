const http = require('node:http');

const client = new http.Agent({keepAlive: true});

const request = http.request({
  agent: client,
  hostname: 'localhost',
  port: 8051,
  method: 'POST',
  path: '/create-post',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Length': Buffer.byteLength(res1, 'utf-8') +
    //     Buffer.byteLength(res2, 'utf-8'),
    'Transfer-Encoding': 'chunked', 'name': 'authorizedUser',
  },
});

// This event is emitted only once
request.on('response', response => {
  console.log('\n-------- STATUS --------');
  console.log(`${response.statusCode} ${response.statusMessage}`);
  
  console.log('\n-------- HEADERS --------');
  console.log(response.headers);
  
  console.log('\n-------- BODY --------');
  response.on('data', chunk => {
    console.log(chunk.toString());
  });
  
  response.on('end', () => {
    console.log('No more data in response...');
  });
});

request.end(JSON.stringify({
  title: 'Dart', body: 'Dart makes my heart Flutter',
}));

request.on('error', err => {
  console.log(err.toString());
});
