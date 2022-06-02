var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '$qlServer2016',
        // tedious currently does not know how to connect to a SQL Server instance through a named pipe
        server: '(localdb)\\MSSQLLocalDB', 
        database: 'sampledb',
        // tedious deprecated The default value for `config.options.enableArithAbort` will change from `false` to `true` in the next major version of `tedious`. Set the value to `true` or `false` explicitly to silence this message.
        options: {
             enableArithAbort: true 
        }
    };
    // connect to your database
    sql.connect(config, function (err) {
        // console.log(config.server);
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM sample', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Listening on port 5000...');
});