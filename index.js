// importar o express
const express = require('express');

// Importando o roteador
const PizzasRouter = require('./routers/PizzasRouter');
const AdmRouter = require('./routers/AdmRouter');

// criar o servidor
const app = express();

// Configurando o template engine EJS
app.set("view engine","ejs");
app.set("views", "./views");

// Configurar a pasta public
app.use(express.static(__dirname + '/public'));

// criar a rota respondendo a requisição
app.use('/', PizzasRouter);
app.use('/adm', AdmRouter);

// levantar o servidor
app.listen(3000, ()=>{console.log("servir rodando...")})
