// Upload a file

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
 var newFile = fs.createWriteStream("readme_copy2.md");
 request.pipe(newFile);

 request.on('end', function() {
  response.end("Uploadded!");
 });
 // cd  "C:\Users\Rajani\Desktop\Working\Node.js\Level 3"
 // curl --upload-file readme.md http://localhost:8080
 // OR
 // curl --upload-file "C:\Users\Rajani\Desktop\Working\Node.js\Level 3\readme.md" http://localhost:8080
}).listen(8080, function() {
 console.log("Listening on port 8080");
});