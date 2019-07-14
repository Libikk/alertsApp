const app = require('express')();
const server = require('http').Server(app);
const next = require('next');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const { sql, sqlQuery } = require('./sql/sqlServer');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const dev = process.env.NODE_ENV !== 'development';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const scan = require('./productScaner/scan');
const schedule = require('node-schedule');

const websitesController = require('./controllers/api/websitesController2');
const scansController = require('./controllers/api/scansController');
const authController = require('./controllers/api/authController');

schedule.scheduleJob({ hour: 10, minute: 28 }, () => scan()); // every day, 10am


nextApp.prepare()
  .then(() => {
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use('/api/websites', websitesController);
    app.use('/api/scans', scansController);
    app.use('/api/auth', authController);

    app.get('/test', (req, res) => {
      const token = req.cookies.access_token;
      console.log('req.cookies: ', req.cookies);
      console.log('token: ', token);
      const secret = 'FdsfDSF1dsfD__2..SFDS34)_;L;';
      const decoded = jwt.verify(token, secret);
      console.log('decoded: ', decoded);
      res.send(decoded)
    });

    app.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;

    });
  });
