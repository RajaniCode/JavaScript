// Read from the request

var http = require('http');

http.createServer(function(request, response) {
 response.writeHead(200);
 request.on('readable', function() {
  var chunk = null;
  while(null !== (chunk = request.read())) {
   response.write(chunk);
  }
 });
 request.on('end', function() {
  response.end();
 });
 // curl -d 'hello' http://localhost:8080
}).listen(8080, function() {
 console.log("Listening on port 8080...")
});


