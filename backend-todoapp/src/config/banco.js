const { Client } = require('pg')

client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'unifacef',
    database: 'tic',
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Conexão com o POSTGRES feita com sucesso =)')
    }
})

client.query('select * from usuario', (err, res) => {
    if (err) throw err
    console.log(res.rows)
    client.end()
})