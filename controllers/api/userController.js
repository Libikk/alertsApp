const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { sqlQuery, mapKeysToParams } = require('../../sql/sqlServer');
const passport = require('../../passportStrategy');

const getUserData = (req, res, next) => {
  sqlQuery('SELECT userId, email, lastLoggedIn, userName, createdAt FROM discounthero.users where email = ?', [req.user.email])
    .then(response => res.send(response[0]))
    .catch(next);
};

const updateUserDetails = async (req, res, next) => {
  const { body: { password, userName }, user: { userId } } = req;
  const params = {
    userId,
    password: null,
    userName: null,
  };

  if (password && password.length < 6) {
    return next(new Error('Password is too short'));
  }

  if (password) params.password = await bcrypt.hash(password, 10);
  if (userName) params.userName = userName;

  sqlQuery('updateUserDetails', mapKeysToParams(params))
    .then((response) => {
      const isUpdated = response[0].changedRows || response[1].changedRows;

      if (isUpdated) return res.sendStatus(200);
      next(new Error('Details are not updated.'));
    })
    .catch(next);
};

router.get('/getUserData', getUserData);
router.post('/updateUserDetails', passport.authenticate('jwt', { session: false }), updateUserDetails);

module.exports = router;
