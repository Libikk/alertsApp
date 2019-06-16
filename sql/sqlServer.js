const sql = require('mysql').createConnection({
    host: 'localhost',
    user: 'sytek',
    password: 'Cycki12345',
    database: 'discouthero'
});

module.exports = sql;