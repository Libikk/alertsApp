require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const next = require('next');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const { sql, sqlQuery } = require('./sql/sqlServer');
const cookieParser = require('cookie-parser');
const passport = require('./passportStrategy');
const morgan = require('morgan');
const { env, port } = require('./appConfig');

const nextApp = next({ dev: env === 'development' });
const handle = nextApp.getRequestHandler();
const scanService = require('./productScaner/scan');
const schedule = require('node-schedule');
const errorHandler = require('./middleware/errorHandler');

const websitesController = require('./controllers/api/websitesController2');
const scansController = require('./controllers/api/scansController');
const authController = require('./controllers/api/authController');
const userController = require('./controllers/api/userController');
const productController = require('./controllers/api/productController');

schedule.scheduleJob({ hour: 10, minute: 1 }, () => scanService.scanProducts()); // every day, 10am


nextApp.prepare()
  .then(() => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use('/api/websites', websitesController);
    app.use('/api/scans', scansController);
    app.use('/api/auth', authController);
    app.use('/api/user', passport.authenticate('jwt', { session: false }), userController);
    app.use('/api/product', productController);

    app.use(errorHandler);

    app.get('/login', (req, res) => {
      const actualPage = '/loginPage';
      nextApp.render(req, res, actualPage);
    });

    app.get('/dashboard/myProducts', (req, res) => {
      const actualPage = '/dashboard';
      nextApp.render(req, res, actualPage);
    });

    app.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
    });
  });
