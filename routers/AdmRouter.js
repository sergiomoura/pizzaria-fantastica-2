// Importar o express
const express = require('express');

// Importar o PizzasController
const PizzasController = require('../controllers/PizzasController')

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/pizzas/create', PizzasController.create);

// Exportar o roteador
module.exports = router;