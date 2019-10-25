// cria uma instância do esquema do Todo
const Todo = require('./todo')
// configura os métodos da API
// get -> consulta
// post -> insere
// put -> atualiza
// delete -> remove
Todo.methods(['get', 'post', 'put', 'delete'])
// configura as opções da atualização
// depois de atualizar, retorna a tarefa atualizada (new: true)
// ao atualizar, os validadores devem ser utilizados (runValidators: true)
Todo.updateOptions({ new: true, runValidators: true })
// exporta o esquema para ser utilizado em outro arquivo
module.exports = Todo