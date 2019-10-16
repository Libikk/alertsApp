const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const { sqlQuery } = require('../../sql/sqlServer');
const { Sentry } = require('../../middleware/errorHandler');
const { emailLayout, composeUserProductsIntoHTML, activationTokenTemplate } = require('./emailTemplates');

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.MAILER__KEY,
  },
}));

const mailService = {
  updatePersonNotificationsData: userData => userData.products.forEach(({ productId }) => sqlQuery(`insert into notifications (userId, productId) values (${userData.userId}, ${productId})`).catch(console.error)),//eslint-disable-line
  sendProductsNotifications: (userData) => {
    const structuredMail = emailLayout(composeUserProductsIntoHTML(userData), userData.email);

    mailService.send(structuredMail, userData)
      .then(() => mailService.updatePersonNotificationsData(userData));
  },
  sendActivationEmail: (activationToken, email, userName) => {
    const structuredMail = emailLayout(activationTokenTemplate(activationToken, email, userName), email);

    mailService.send(structuredMail, { email, userName });
  },
  send: (structuredMail, userData) => {
    transporter.sendMail(structuredMail, (error, info) => {
      if (error) {
        Sentry.withScope((scope) => {
          scope.setExtra('data', { userData });
          Sentry.captureException(error);
        });
        console.error('Error with sending mail: ' + error); //eslint-disable-line
        throw new Error(error);
      } else {
        console.log('Successfully sent mail to: ' + JSON.stringify(info)); //eslint-disable-line
      }
      return info;
    });
  },
};

module.exports = mailService;
