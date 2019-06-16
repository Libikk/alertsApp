connection = require('mysql').createConnection({
    host: 'localhost',
    user: 'sytek',
    password: 'Cycki12345',
    database: 'discouthero'
});

connection.connect((err) => {
if (err) throw err;
console.log('Connected to SQL!');
});


module.exports = connection