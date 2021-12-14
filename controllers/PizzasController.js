const pizzas = require('../database/Pizzas.json');
const fs = require('fs');
const { validationResult } = require('express-validator');


const controller = {
    
    listar: (req, res)=> {
        return res.render('index',{pizzas, busca:""});
        // res.send(pizzas)
    },

    getPizza: (req, res) => {

        // Capturar o id requisitado (req.params)
        const idPizza = req.params.id;
        let idPrev = null;
        let idNext = null;

        // Capturar do array a pizza com o id requisitado (pizzas.find)
        const pizza = pizzas.find(
            (p, i) => {
                idPrev = pizzas[i-1]==undefined?undefined:pizzas[i-1].id;
                idNext = pizzas[i+1]==undefined?undefined:pizzas[i+1].id;
                return p.id == idPizza
            });

        // Retornar a pizza encontrada para o cliente (res.send())
        res.render('pizza',{pizza, idNext, idPrev});

    },

    busca: (req,res) => {

        // Capturar a string digitada pelo visitante
        const string = req.query.q.trim();

        // Filtrar do arrays de pizzas somente as pizzas
        // que que tiverem a string buscada no nome
        const pizzasFiltras = pizzas.filter(
            p => p.nome.toUpperCase().includes(string.toUpperCase())
        );

        // Renderizar a view index passando para ela
        // as pizzas filtradas
        res.render('index', {pizzas:pizzasFiltras, busca:string});
    },

    create: (req, res) => {
        res.render('crud-pizzas/create')
    },

    store: (req,res) => {

        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            // return res.send(erros.mapped());
            res.render('crud-pizzas/create', {erros: erros.mapped()})
        }

        const nome = req.body.nome;
        const ingredientes = req.body.ingredientes.split(',').map(a => a.trim());
        const preco = Number(req.body.preco);
        const pizza = {nome, ingredientes, preco, img:'/img/' + req.file.filename}
        
        // Adicionar o id à pizza recém criada
        pizza.id = pizzas[pizzas.length - 1].id + 1;

        // Adicionar a pizza ao array de pizzas
        pizzas.push(pizza);

        // Salvar o json do array de pizzas no arquivo Pizzas.json
        fs.writeFileSync(
            __dirname + '/../database/Pizzas.json',
            JSON.stringify(pizzas, null, 4),
            {flag:'w'}
        );
        
        // Direcionar o usuário para a página que exibe a lista de pizzas
        res.redirect('/');

    }



}

module.exports = controller;