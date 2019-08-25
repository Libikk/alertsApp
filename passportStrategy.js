const passport = require('passport');
const passportJWT = require('passport-jwt');
const { executeRawSQL } = require('./sql/sqlServer');

const JwtStrategy = passportJWT.Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: cookieExtractor,
};

const passportStrategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  executeRawSQL('select * from users where email = ? and userName = ?', [jwtPayload.email, jwtPayload.userName]).then((user) => {
    if (user[0]) {
      next(null, user[0]);
    } else {
      next(null, false);
    }
  }).catch(next);
});

passport.use(passportStrategy);

module.exports = passport;
