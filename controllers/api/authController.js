const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const passport = require('../../passportStrategy');
const _ = require('lodash');
const passwordGenerator = require('generate-password');
const { sendActivationEmail, sendPasswordRestartEmail } = require('../../notifications/email/emailService');

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();
const { sqlQuery, mapKeysToParams } = require('../../sql/sqlServer');
const { initialUserData: { emailNotifications, mobileAppNotifications, smsNotifications } } = require('../../appConfig');

const authResponseHandler = (req, res, user, next) => {
  const context = { email: user.email, userName: user.userName, role: user.role };
  const isFromMobileReq = req.headers.mobile;
  const token = jwt.sign(context, jwtSecret, { expiresIn: isFromMobileReq ? '365d' : '2d' });

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
        if (!response.insertId) return next(Object.assign(new Error(), { name: 'USER_ALREADY_EXIST' }));
        sendActivationEmail(activationToken, email, userName);
        authResponseHandler(req, res, { userName, email, userId: response.insertId }, next);
        return response.insertId;
      })
      .then(userId => userId && sqlQuery('createUserNotificationSettings', [emailNotifications, mobileAppNotifications, smsNotifications, userId]))
      .catch(next);
  } else {
    next(Object.assign(new Error(), { name: 'INVALID_VALUE' }));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await sqlQuery('select *, case active WHEN "0" THEN 0 WHEN "1" THEN 1 END AS "isActive" from users where email = ?', [email]).then(e => e[0]).catch(next);
    if (!user) {
      return next(Object.assign(new Error(), { name: 'WRONG_PASSWORD_OR_EMAIL' }));
    }

    if (bcrypt.compareSync(password, user.password)) {
      return authResponseHandler(req, res, { role: user.role, userName: user.userName, email: user.email, lastLoggedIn: new Date(), isActive: user.isActive }, next);
    }
    return next(Object.assign(new Error(), { name: 'WRONG_PASSWORD' }));
  }
  return next(Object.assign(new Error(), { name: 'INVALID_VALUE' }));
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
    authResponseHandler(req, res, user, next);
  } else {
    next(Object.assign(new Error(), { name: 'USER_NOT_FOUND' }));
  }
};

const reSendActivationToken = (req, res, next) => {
  const { isActive, email, userName, activationToken, activationTokenSentDate } = req.user;

  if (isActive) {
    return next(Object.assign(new Error(), { name: 'ACCOUNT_ALREADY_ACTIVE' }));
  }

  const isSendToday = moment().diff(activationTokenSentDate, 'days') === 0;
  if (!isSendToday) {
    return sendActivationEmail(activationToken, email, userName)
      .then(() => res.sendStatus(200))
      .catch(next);
  }
  return next(Object.assign(new Error(), { name: 'EMAIL_ALREADY_SENT' }));
};

const passwordReset = async (req, res, next) => {
  const { email } = req.body;
  const generatedPassword = passwordGenerator.generate({ length: 7, numbers: true });
  const hashPass = await bcrypt.hash(generatedPassword, 10);

  const [{ affectedRows }, user] = await sqlQuery('changeUserPassword', mapKeysToParams({ hashPass, email })).catch(next);
  const userName = _.get(user, '0.userName', '');

  if (affectedRows) {
    return sendPasswordRestartEmail(generatedPassword, email, userName)
      .then(() => res.sendStatus(200))
      .catch(next);
  }
  return next(Object.assign(new Error(), { name: 'PASSWORDS_CHANGE' }));
};

router.post('/authorize', authorize);
router.post('/login', login);
router.post('/passwordReset', passwordReset);
router.post('/register', register);
router.post('/reSendActivationToken', passport.authenticate('jwt', { session: false }), reSendActivationToken);

module.exports = router;
