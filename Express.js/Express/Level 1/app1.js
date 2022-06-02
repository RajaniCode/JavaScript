var express = require('express');
var app = express();
app.get('/locations', function(request, response) {
 response.send(["Caspiana", "Indigo", "Paradise"]);
});
// curl http://localhost:3001/locations
app.listen(3001, function(){
 console.log("Running Express");
});