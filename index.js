require('dotenv/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/routes');
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) });