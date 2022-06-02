const sql = require('mssql');

(async function () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        // tedious currently does not know how to connect to a SQL Server instance through a named pipe
        await sql.connect('mssql://sa:$qlServer2016@(localdb)/MSSQLLocalDB/sampledb');
        const result = await sql.query`SELECT * FROM sample`;
        console.dir(result);
    } catch (err) {
        // ... error checks
        console.log(err);
    }
})();