const env = (process.env.NODE_ENV || 'development').trim();

const config = {
  env: (process.env.NODE_ENV || 'development').trim(),
  version: '1.08',
  envUrl: env === 'production' ? process.env.ENV_URL : 'http://localhost:3000',
  port: env === 'production' ? 5000 : 3000,
  sendProductNotificationsAgain: 15, // days
  initialUserData: {
    emailNotifications: 1, // BIT
    mobileAppNotifications: 0, // BIT
    smsNotifications: 0, // BIT
  },
};

module.exports = config;
