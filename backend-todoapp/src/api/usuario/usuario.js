// cria uma instância node-restful
const restful = require('node-restful')
// fazer a instância estar preparada para trabalhar com MongoDB
const mongoose = restful.mongoose
// cria uma instância de um esquema do MongoDB
// colunas description (String), done (Boolean) e createdAt (Date)
const usuarioSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true},
})
// cria um modelo do esquema chamdo Usuario e o exporta para ser 
// utilizado em outro arquivo
module.exports = restful.model('Usuario', usuarioSchema)