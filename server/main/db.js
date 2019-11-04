const { Pool} =require('pg')

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'database1',
    password:'Bonjovi3!'
})

module.exports = pool