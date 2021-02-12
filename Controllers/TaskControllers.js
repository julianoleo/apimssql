const sql = require('mssql');

const connStr = {
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    stream: 'false',
    options: {
        enableArithAbort: true,
        encrypt: true
    },
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    server: process.env.DB_HOST,
}

sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

class TaskController {
    clientes(req, res) {
        const stringSql = 'select * from dbo.produtoServico'
        global.conn.request()
            .query(stringSql, res)
            .then(result => res.json(result.recordset))
            .catch(err => res.json(err));
    }
}

module.exports = new TaskController()