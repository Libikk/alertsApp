const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendActivationEmail } = require('../../notifications/email/emailService');

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const { initialUserData: { emailNotifications, mobileAppNotifications, smsNotifications } } = require('../../appConfig');

const authResponseHandler = (res, user) => {
  const context = { email: user.email, userName: user.userName };
  const token = jwt.sign(context, jwtSecret, { expiresIn: '2d' });
  res.cookie('access_token', token).json(user);
};

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (userName && email && password) {
    const hashPass = await bcrypt.hash(password, 10);
    const activationToken = crypto.randomBytes(20).toString('hex');

    sqlQuery('createNewUserData', { '@userName': userName, '@email': email, '@hashPass': hashPass, '@activationToken': activationToken })
      .then((response) => {
        if (!response.insertId) return next(new Error('This user already exist'));
        sendActivationEmail(activationToken, email, userName);
        authResponseHandler(res, { userName, email, userId: response.insertId });
        return response.insertId;
      })
      .then(userId => userId && sqlQuery('createUserNotificationSettings', [emailNotifications, mobileAppNotifications, smsNotifications, userId]))
      .catch(next);
  } else {
    next(new Error('Invalid data'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await sqlQuery('select * from users where email = ?', [email]).then(e => e[0]).catch(next);
    if (!user) {
      return next(new Error('Wrong Email or Password'));
    }

    if (bcrypt.compareSync(password, user.password)) {
      return sqlQuery('UPDATE users set lastLoggedIn = now() where email = ?', [email])
        .then(() => authResponseHandler(res, { userName: user.userName, email: user.email, lastLoggedIn: new Date() }))
        .catch(next);
    }
    return next(new Error('Wrong Password'));
  }
  return next(new Error('Invalid data'));
};

const authorize = async (req, res, next) => {
  const requestToken = req.body.token;
  let verified = true;

  jwt.verify(requestToken, jwtSecret, (err) => {
    if (err) verified = false;
  });

  if (verified) {
    const { payload: { email } } = jwt.decode(requestToken, { complete: true });
    const user = await sqlQuery('getUserData', [email]).then(e => e[0]).catch(next);
    authResponseHandler(res, user);
  } else {
    next(new Error('User not found'));
  }
};

router.post('/authorize', authorize);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
