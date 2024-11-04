const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer();

server.on('request', async (req, res) => {
  if (req.url === '/' && req.method === 'GET')
  {
    res.setHeader('Content-Type', 'text/html');
    const fileHandle = await fs.open('./public/index.html', 'r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(res);
  }
  
  if (req.url === '/styles.css' && req.method === 'GET')
  {
    res.setHeader('Content-Type', 'text/css');
    const fileHandle = await fs.open('./public/styles.css', 'r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(res);
  }
  
  if (req.url === '/favicon.ico' && req.method === 'GET')
  {
    res.setHeader('Content-Type', 'image/x-icon');
    const fileHandle = await fs.open('./public/favicon.ico', 'r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(res);
  }
  
  if (req.url === '/scripts.js' && req.method === 'GET')
  {
    res.setHeader('Content-Type', 'text/javascript');
    const fileHandle = await fs.open('./public/scripts.js', 'r');
    const fileStream = fileHandle.createReadStream();
    fileStream.pipe(res);
  }
  
  if (req.url === '/login' && req.method === 'POST')
  {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    
    const body = {
      message: 'Logged in!',
    };
    
    res.end(JSON.stringify(body));
  }
  
  if (req.url === '/upload' && req.method === 'PUT')
  {
    const fileHandle = await fs.open('./storage/image.jpeg',
        'w');
    const fileStream = fileHandle.createWriteStream();
    
    req.pipe(fileStream);
    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        message: 'File Uploaded Successfully!',
      }));
    });
  }
  
});

server.listen(8080, () => {
  console.log('WebServer live at http://localhost:8080');
});
