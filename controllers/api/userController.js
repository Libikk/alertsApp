const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');

const getUserData = (req, res, next) => {
  try {
    console.log('req: ', req.body, req.user, req.query, Object.keys(req));
    const token = req.cookies.access_token;
    console.log('req.cookies: ', req.cookies);
    // if (!token) {
    //     return res.status(404).send({ err: 'User not found' });
    // }
    const secret = 'FdsfDSF1dsfD__2..SFDS34)_;L;';
    const decoded = jwt.verify(token, secret);
    res.send(decoded);
  } catch(err) {
    console.log('err:FUNCTKING ERRORR ');
    next(err)
  }

    //res.send({ gh: 100 })
  //  sqlQuery('SELECT * FROM discounthero.websites').then(response => res.send(response));
}

router.get('/getUserData', getUserData);

module.exports = router;
