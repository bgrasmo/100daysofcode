const PORT = process.env.PORT || 3000;

const http = require('http');

function handleRequest(request, response) {
  if (request.url === '/currenttime') {
    response.statusCode = 200;
    response.end('<h1>' + new Date().toISOString() + '</h1>');
  } else if (request.url === '/') {
    response.statusCode = 200;
    response.end('<h1>Hello, world!</h1>');
  } else {
    response.statusCode = 404;
    response.end('<h1>Not found!</h1>');
  }
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
});