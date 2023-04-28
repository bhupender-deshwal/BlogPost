const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'blog',
    multipleStatements: true
})
db.connect((err)=>{
    if(err) throw err;
    console.log('connection successful')
})

module.exports = db;