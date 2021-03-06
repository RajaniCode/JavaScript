var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  // tedious currently does not know how to connect to a SQL Server instance through a named pipe
  server: '(localdb)\\MSSQLLocalDB',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: '$qlServer2016'
    }
  },
  options: {    
    // debug: {
      // packet: true,
      // data: true,
      // payload: true,
      // token: false,
      // log: true
    // }, 
    database: 'sampledb',
    // encrypt: true // for Azure users
  }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
    // If no error, then good to go...
    executeStatement();
  }
);

connection.on('debug', function(text) {
    //console.log(text);
  }
);

function executeStatement() {
  request = new Request("SELECT * FROM sample", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }

    connection.close();
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      // if (column.value === NULL) {
        // console.log('NULL');
      // } else {
      if (column.value != "") { 
        console.log(column.value);
      }
    });
  });

  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
  });

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);
}