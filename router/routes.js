const express = require('express');
const TaskControllers = require('../Controllers/TaskControllers');
const ApiControllers = require('../Controllers/ApiController');
const router = express.Router();

//Gestão de Token
router.get('/login', ApiControllers.login)
router.get('/logoff', ApiControllers.logoff)

//router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/produtos', ApiControllers.verificar,  TaskControllers.produtos)
router.get('/produtos/:id', ApiControllers.verificar, TaskControllers.produtosID)

module.exports = router