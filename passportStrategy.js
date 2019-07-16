const passport = require('passport');
const passportJWT = require('passport-jwt');
const { sqlQuery } = require('./sql/sqlServer');

const JwtStrategy = passportJWT.Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

const secret = 'FdsfDSF1dsfD__2..SFDS34)_;L;';

const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

const passportStrategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  sqlQuery('select * from users where userId = ? and userName = ?', [jwtPayload.id, jwtPayload.userName]).then((user) => {
    if (user[0]) {
      next(null, user[0]);
    } else {
      next(null, false);
    }
  }).catch(next);
})

passport.use(passportStrategy);

module.exports = passport;
