module.exports = {
    showLogin: (req,res) => {
        return res.render("login");
    },
    login: (req,res) => {

        // Capturar o email e a senha inseridos pelo usuário
        const {email, senha} = req.body;

        // Carregar o array de usuários (database/Usuarios.json)
        const usuarios = require('../database/Usuarios.json');

        // Buscar o usuário no array pelo email digitado
        const usuario = usuarios.find( u => u.email == email && u.senha == senha )

        // Caso usuário não exista, retornar erro (fim)
        if(usuario === undefined){
            return res.send("Senha ou email inválidos");
        }

        // Se chegou até aqui, manda uma mensagem de sucesso.
        return res.send("ok! Tudo certo...")

    }
}