// Upload a file

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
 // var newFile = fs.createWriteStream("readme_copy3.md");
 var newFile = fs.createWriteStream("readme_copy3.pdf");
 
 var fileBytes = request.headers['content-length'];
 var uploadedBytes = 0;
 request.on('readable', function() {
  var chunk = null;
  while(null !== (chunk = request.read())) {
   uploadedBytes += chunk.length;
   var progress = (uploadedBytes / fileBytes) * 100;
   response.write("progress: " + parseInt(progress, 10) + "%\n");
  }
 }); 


 request.pipe(newFile);

 request.on('end', function() {
  response.end("Uploadded!");
 });
 // cd  "C:\Users\Rajani\Desktop\Working\Node.js\Level 3"
 // curl --upload-file readme.md http://localhost:8080
 // OR
 // curl --upload-file "C:\Users\Rajani\Desktop\Working\Node.js\Level 3\readme.md" http://localhost:8080
 // OR
 // curl --upload-file "C:\Users\Rajani\Desktop\Working\Node.js\Level 3\level-3.pdf" http://localhost:8080
}).listen(8080, function() {
 console.log("Listening on port 8080");
});