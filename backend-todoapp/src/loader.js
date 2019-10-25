const server = require('./config/server')
require('./config/banco')

require('./config/routes')(server)