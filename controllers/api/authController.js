const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const passport = require('../../passportStrategy');
const { sendActivationEmail } = require('../../notifications/email/emailService');

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();
const { sqlQuery } = require('../../sql/sqlServer');
const { initialUserData: { emailNotifications, mobileAppNotifications, smsNotifications } } = require('../../appConfig');

const authResponseHandler = (res, user, next) => {
  const context = { email: user.email, userName: user.userName, role: user.role };
  const token = jwt.sign(context, jwtSecret, { expiresIn: '2d' });
  res.cookie('access_token', token).json(user);
  sqlQuery('updateUserLastLogin', [user.email]).catch(next);
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
        authResponseHandler(res, { userName, email, userId: response.insertId }, next);
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
      return authResponseHandler(res, { role: user.role, userName: user.userName, email: user.email, lastLoggedIn: new Date(), isActive: user.active.readUIntLE() }, next);
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
    const user = await sqlQuery('getUserData', [email]).then(e => e.pop()).catch(next);
    authResponseHandler(res, user, next);
  } else {
    next(new Error('User not found'));
  }
};

const reSendActivationToken = (req, res, next) => {
  const { active, email, userName, activationToken, activationTokenSentDate } = req.user;

  const isAccActive = active.readUIntLE();
  if (isAccActive) {
    return next(new Error('You\'r account is already active.'));
  }

  const isSendToday = moment().diff(activationTokenSentDate, 'days') === 0;
  if (!isSendToday) {
    return sendActivationEmail(activationToken, email, userName)
      .then(() => res.sendStatus(200))
      .catch(next);
  }
  return next(new Error('Email has been sent already'));
};

router.post('/authorize', authorize);
router.post('/login', login);
router.post('/register', register);
router.post('/reSendActivationToken', passport.authenticate('jwt', { session: false }), reSendActivationToken);

module.exports = router;
