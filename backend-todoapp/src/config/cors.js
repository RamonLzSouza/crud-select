module.exports = function (req, res, next) {
    // permite acesso às APIS de qualquer IP
    res.header('Access-Control-Allow-Origin', '*')
    // permite acesso às APIS com métodos GET, POST, PUT e DELETE
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // configura cabeçalho da resposta
    res.header('Access-Control-Allow-Headers', '*')
    // executa próxima atividade
    next()
}