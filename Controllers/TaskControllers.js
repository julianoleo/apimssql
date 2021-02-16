const sql = require('mssql');
const connStr = require('../databases/dbErpQuality')
const { validationResult } = require('express-validator')

sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

class TaskController {
    produtos(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else {
            const stringSql = 'select * from dbo.produtoServico'
            global.conn.request()
                .query(stringSql, res)
                .then(result => res.json(result.recordset))
                .catch(err => res.json(err));
        }
    }

    produtosID(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else {
            const id = req.params.id;
            global.conn.request()
                .input('id', id)
                .execute('BuscaProdutoId', (err, resultado) => {
                    if (err) {
                        console.log(err);
                        res.status(500)
                        res.json({ "message": "Internal Server Error" })
                    } else if (resultado.rowsAffected > 0) {
                        res.status(200)
                        res.json(resultado.recordset)
                    } else {
                        res.status(404)
                        res.json({ "message": "Produto não encontrado!" })
                    }
                });
        }
    }
}

module.exports = new TaskController()