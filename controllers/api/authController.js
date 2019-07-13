const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const getQuery = require('../getQuery');

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (userName, email, password) {
    const hashPass = await bcrypt.hash(password, 10);

    sqlQuery('insert into users (userName, email, password, createdAt) values (?, ?, ?, ?)', [userName, email, hashPass, new Date()])
      .then((e) => {
        res.send(200).json(res.body);
      });
  }
  console.log('req: ', req.body);
};

router.post('/register', register);

module.exports = router;
