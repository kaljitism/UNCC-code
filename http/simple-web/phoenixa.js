const http = require('http');
const fs = require('fs/promises');

class Phoenixa {
  
  constructor() {
    this.server = http.createServer();
    /*
    * {
    * 'get/': () => { ... },
    * 'post/upload': () => { ... },
    * }
    */
    this.routes = {};
    
    this.server.on('request', (req, res) => {
      // sending a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();
        
        res.setHeader('Content-Type', mime);
        
        fileStream.pipe(res);
      };
      
      // set the status code of the response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      
      // send json to the client
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      };
      
      // if the routes object does not have a key of req.method + req.url,
      // return 404;
      if (!this.routes[req.method.toLowerCase() + req.url])
      {
        return res.status(404).json({error: `Cannot ${req.method} ${req.url}`});
      }
      
      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }
  
  listen(port, callback) {
    this.server.listen(
        port,
        () => {
          callback();
        },
    );
  };
  
  route(method, path, callback) {
    this.routes[method + path] = callback;
  }
}

module.exports = Phoenixa;
