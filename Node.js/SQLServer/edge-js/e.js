#!javascript
// cmd
// Set Environment Variable
// >SETX EDGE_SQL_CONNECTION_STRING "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=sampledb;Integrated Security=True"
// OR
// >SETX EDGE_SQL_CONNECTION_STRING "Server=(localdb)\MSSQLLocalDB;Database=sampledb;Integrated Security=True"
// OR
// >SETX EDGE_SQL_CONNECTION_STRING "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=sampledb;User=sa;Password=$qlServer2016"
// OR
// >SETX EDGE_SQL_CONNECTION_STRING "Server=(localdb)\MSSQLLocalDB;Database=sampledb;User=sa;Password=$qlServer2016"
// Print Environment Variables
// >SET
// Unset Environment Variable (User Variable)
// >reg delete HKEY_CURRENT_USER\Environment /v EDGE_SQL_CONNECTION_STRING /f
// Unset Environment Variable (System Variable) [Requires Administrator Privileges]
// >reg delete "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v EDGE_SQL_CONNECTION_STRING /f
var http = require('http');
var edge = require('edge-js');
var port = process.env.PORT || 8080;

// Instead of SETX EDGE_SQL_CONNECTION_STRING
//var sqlPath = "Data Source=(localdb)\\MSSQLLocalDB;"+
              //"Initial Catalog=sampledb;"+
              //"Integrated Security=true";

//var sqlPath = "Server=(localdb)\\MSSQLLocalDB;"+
              //"Database=sampledb;"+
              //"Trusted_Connection=sspi";

//var sqlPath = "Data Source=(localdb)\\MSSQLLocalDB;"+
              //"Initial Catalog=sampledb;"+
              //"User ID=sa;"+
              //"Password=$qlServer2016";

var sqlPath = "Server=(localdb)\\MSSQLLocalDB;"+
              "Database=sampledb;"+
              "User ID=sa;"+
              "Password=$qlServer2016";

//var getData = edge.func('sql', function () {/*
  //SELECT * FROM sample
//*/});

var getData = edge.func('sql', { 
  source: function () {/*
    SELECT * FROM sample
*/},
  connectionString: sqlPath
});

function logError(err, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Error: " + err);
    res.end("");
}    

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    getData(null, function (error, result) {
        if (error) { logError(error, res); return; }
        if (result) {
            var json = JSON.stringify(result);
            // res.write("<ul>");            
            // result.forEach(function(row) {
                 // res.write("<li>" + row.id +  " " +  row.name + " " + row.date + "</li>");              
            // });          
            // res.end("</ul>");
            res.end(json);
        }
        else {
        }
    });
}).listen(port);
console.log("Node server listening on port " + port);