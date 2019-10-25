// cria instância do mongoose
const mongoose = require('mongoose')
// prepara para se conectar
mongoose.Promise = global.Promise
// conecta e exporta o resultado para ser utilizado em outro arquivo
module.exports = mongoose.connect('mongodb://localhost/usuario')