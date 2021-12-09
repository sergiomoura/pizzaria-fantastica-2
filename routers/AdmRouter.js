// Importar o express
const express = require('express');

const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {cb(null, __dirname + '/../public/img')},
        filename: (req, file, cb) => {
            console.log(file);
            cb(null,Date.now() + '-' + file.originalname);
        }
    }
);
const upload = multer({storage})


// Importar o PizzasController
const PizzasController = require('../controllers/PizzasController')

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/pizzas/create', PizzasController.create);
router.post('/pizzas/create', upload.single('img'), PizzasController.store);

// Exportar o roteador
module.exports = router;