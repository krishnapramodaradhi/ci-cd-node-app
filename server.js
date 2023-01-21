const http = require('http');

const PORT = process.env.PORT || 8000;
const server = http.createServer((req, res) => {
  console.log('Request reached your server');
  console.log(req.headers.host);
  console.log(req.url);
  try {
    if (req.url === '/error') {
      throw new Error('You have reached the error route');
    } else if (req.url === '/hello') {
      return res.end('Hello from the server');
    }
    res.end('Hello world');
  } catch (err) {
    console.log('An unknown error occured', err);
    res.end('Thanks!!');
  }
});

server.listen(PORT, () => {
  console.log(`Magic 🪄 happens on port ${PORT}`);
});
