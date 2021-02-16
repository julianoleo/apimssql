const sql = require('mssql');
const connStr = require('../databases/dbErpQuality')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

class apiController {

    login(req, res) {
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        global.conn.request()
            .input('usuario', usuario)
            .input('senha', senha)
            .execute('BuscarUsuario', (err, resultado) => {
                if (err) {
                    return console.log(err);
                } else {
                    resultado.recordset.forEach(function (item) {
                        if (item.result === 1) {
                            jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 30 }, (err, token) => {
                                res.status(200)
                                res.json({
                                    auth: true,
                                    token: token
                                })
                            })
                        } else if (item.result === 0) {
                            res.status(403)
                            res.json({
                                auth: false,
                                message: "Usuário e/ou senhas incorreto(s)"
                            })
                        }
                    })
                }
            });
    }

    verificar(req, res, next) {
        const token = req.headers['token']
        if (!token) {
            res.status(401)
            res.send({
                auth: false,
                message: 'O token está em branco'
            })
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(500)
                res.send({
                    auth: false,
                    message: 'Falha de autenticação'
                })
            } else {
                next()
            }
        })
    }

    logoff(request, response) {
        console.log("Logoff API!")
        response.status(200)
        response.send({
            auth: false,
            token: null
        })
    }

}

module.exports = new apiController()