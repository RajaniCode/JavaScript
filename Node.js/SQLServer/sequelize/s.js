const Sequelize = require('sequelize');

const sequelize = new Sequelize('sampledb', 'sa', '$qlServer2016', {
    dialect: 'mssql',
    // tedious currently does not know how to connect to a SQL Server instance through a named pipe
    host: '(localdb)\\MSSQLLocalDB',
    // dialectOptions: {
        // encrypt: true
    // }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });