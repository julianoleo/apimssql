const express = require('express');
const TaskControllers = require('../Controllers/TaskControllers');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/clientes', TaskControllers.clientes)

module.exports = router