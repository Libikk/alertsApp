const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (userName && email && password) {
    const hashPass = await bcrypt.hash(password, 10);

    sqlQuery('insert into users (userName, email, password, createdAt) values (?, ?, ?, ?)', [userName, email, hashPass, new Date()])
      .then((e) => {
        res.send(200).json(res.body);
      });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await sqlQuery('select * from users where email = ?', [email]).then(e => e[0]);

    if (!user) {
      return next(new Error('Wrong Email or Password'));
    }

    if (bcrypt.compareSync(password, user.password)) {
      sqlQuery('UPDATE users set lastLoggedIn = now() where email = ?', [email]);
      return res.send({ userName: user.userName, userId: user.userId, email: user.email, lastLoggedIn: new Date() });
    }
    return next(new Error('Wrong Password'));
  }
  return next(new Error('Invalid data'));
};

router.post('/login', login);
router.post('/register', register);

module.exports = router;
