const env = (process.env.NODE_ENV || 'development').trim();

const config = {
  env: (process.env.NODE_ENV || 'development').trim(),
  version: '1.08',
  envUrl: env === 'production' ? process.env.ENV_URL : 'http://localhost:3000',
  port: env === 'production' ? 5000 : 3000,
  sendProductNotificationsAgain: 15, // days
  gaTrackingId: env === 'production' ? 'UA-156016719-2' : 'UA-156016719-1',
  initialUserData: {
    emailNotifications: 1, // BIT
    mobileAppNotifications: 0, // BIT
    smsNotifications: 0, // BIT
  },
  validatePatterns: {
    passwordPattern: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z\d$@$!%*#?&]{6,}$/, // Minimum 6 characters, at least one letter and one number
    userNamePattern: /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
  },
};

module.exports = config;
