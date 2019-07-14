const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const user = await sqlQuery('select password, userId, userName from users where email = ?', [email]).then(e => e[0]);
    console.log('user: ', user);

    if (!user) {
      console.log('!user');
      return res.sendStatus(404).send({ msg: 'Email or password wrong' });
    }

    const isSame = await bcrypt.compareSync(password, user.password);
    console.log('isSame: ', isSame);
    if (isSame) {
      const secret = 'FdsfDSF1dsfD__2..SFDS34)_;L;';
      const payload = {
        id: user.userId,
        userName: user.userName,
      };
      const token = jwt.sign(payload, secret, { expiresIn: '2d' });

      res.cookie('access_token', token, {
        httpOnly: true,
      //  secure: true,
      });
      return res.send(payload);
    }
    console.log('HUUUJ');
    return res.status(404).send({ msg: 'HUUUJ' });
  }
  console.log('Invalid Data');
  return res.status(404).send({ msg: 'Invalid Data' });
};

router.post('/login', login);
router.post('/register', register);

module.exports = router;
