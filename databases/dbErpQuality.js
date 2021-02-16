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

module.exports = connStr;