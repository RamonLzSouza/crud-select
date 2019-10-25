// cria uma instância node-restful
const restful = require('node-restful')
// fazer a instância estar preparada para trabalhar com MongoDB
const mongoose = restful.mongoose
// cria uma instância de um esquema do MongoDB
// colunas description (String), done (Boolean) e createdAt (Date)
const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
})
// cria um modelo do esquema chamdo Todo e o exporta para ser 
// utilizado em outro arquivo
module.exports = restful.model('Todo', todoSchema)