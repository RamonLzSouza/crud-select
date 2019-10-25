// cria uma instância do express -> servidor HTTP
const express = require('express')
// executa uma função e retorna o resultado desta
// a função recebe como parâmetro a instância de um servidor
module.exports = function (server) {
    // cria instância das rotas da API
    const router = express.Router()
    // configura o servidor para responder a API /api
    server.use('/api', router)
    // cria instância que representa os métodos GET, POST, PUT e DELETE
    // estes métodos estão associados ao esquema usuario
    const todoService = require('../api/todo/todoService')
    const usuarioService = require('../api/usuario/usuarioService')
    // registra a rota /todos
    // então, na verdade teremos a api /api/todos pronta para ser executada
    // localhost:3003/api/todos -> get, post, put e delete
    todoService.register(router, '/todos')
    usuarioService.register(router, '/usuarios')
}