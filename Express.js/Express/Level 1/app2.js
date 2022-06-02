var express = require('express');
var app = express();

app.get('/cities', function (request, response) {
 var cities = ['Caspiana', 'Indigo', 'Paradise'];
 response.send(cities);
});
app.get('/locations', function (request, response) {
 response.redirect(301, '/cities');
});
app.listen(3001, function () {
 console.log("Running Express");
});

// curl -i http://localhost:3001/locations
// curl -i http://localhost:3001/cities
