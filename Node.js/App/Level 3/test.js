var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  var newFile = fs.createWriteStream("readme_copy4");
  request.pipe(newFile);

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

 request.on('end', function() {
  response.end("Uploaded!");
 });

}).listen(8080, function() {
 console.log("Listening on port 8080");
});