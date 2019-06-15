const app = require('express')();
const server = require('http').Server(app);
const next = require('next');

const sql = require('./sql/serverMySQL');
const dev = process.env.NODE_ENV === 'development';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp.prepare()
  .then(() => {

    app.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    });
})