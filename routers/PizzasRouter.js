// Importar o express
const express = require('express');

// Importar o PizzasController
const PizzasController = require('../controllers/PizzasController')

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/', PizzasController.listar);
router.get('/pizzas', PizzasController.listar);
router.get('/pizzas/:id', PizzasController.getPizza);
router.get('/busca',PizzasController.busca);

// Exportar o roteador
module.exports = router;