const app = require('express')();
const server = require('http').Server(app);
const next = require('next');
// eslint-disable-next-line no-unused-vars
const { sql, sqlQuery } = require('./sql/sqlServer');

const dev = process.env.NODE_ENV === 'development';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const scan = require('./productScaner/scan');
const schedule = require('node-schedule');

schedule.scheduleJob({ hour: 10, minute: 28 }, () => scan()); // every day, 10am


nextApp.prepare()
  .then(() => {
    app.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });
