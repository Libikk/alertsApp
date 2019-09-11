const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const { sqlQuery } = require('../sql/sqlServer');

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.MAILER__KEY,
  },
}));

const mailService = {
  template: (body, to, from = 'notification@DDiscounthero.com') => ({
    from, // Sender address
    to, // List of recipients
    subject: 'DDiscount Hero, new discounts!', // Subject line
    html: `
        <!DOCTYPE html>
        <html>
            <body style="color: #333; background: #fff;">
            <table style="width: 700px; margin: 0 auto; background-color: #fff;" width="700" border="0" cellpadding="0" cellspacing="0">
                <td align="center">
                <img src="cid:portalLogo" alt="logo"/>
                <div style="text-align: center;">
                    ${body}
                    <p>
                      <strong>© 2019 DDiscountHero.com</strong>
                    </p>
                    <p>
                      You are receiving this email because you turned on email notifications for new discounts.
                    </br>
                      Please note: Replies to this email are not monitored. For help or further information, please contact us via help@DDiscounthero.com.
                    </p>

                </div>
                </td>
            </table>
            </body>
        </html>
    `, // Plain text body
    attachments: [{
      filename: 'logo.png',
      contentType: 'image/png',
      path: 'https://i.ibb.co/hMpTPYY/logo.png',
      cid: 'portalLogo',
    }],
  }),
  composeUserProductsIntoHTML: ({ userName, products }) => {
    const productsHtml = products.map(({ productUrl, imageUrl, productName, hostNameUrl }) => `
    <li>
      <h3>
        <a href="${productUrl}" >${productName}</a>
      </h3>
      <p>from: ${hostNameUrl}</p>
      <img src="${imageUrl}" alt="${productName}"/>
    </li>`);
    return `
      <div>
      <h1>Hello ${userName}</h1>
        <ul>
          ${productsHtml.join('')}
        </ul>
      </div>
    `;
  },
  updatePersonNotificationsData: userData => userData.products.forEach(({ productId }) => sqlQuery(`insert into notifications (userId, productId) values (${userData.userId}, ${productId})`).catch(console.error)),//eslint-disable-line
  sendProductsNotifications: (userData) => {
    const structuredMail = mailService.template(mailService.composeUserProductsIntoHTML(userData), userData.email);

    transporter.sendMail(structuredMail, (error, info) => {
      if (error) {
        // ADD SENTRY - to do
        console.error('Error with sending mail: ' + error); //eslint-disable-line
      } else {
        console.log('Successfully sent mail to: ' + JSON.stringify(info)); //eslint-disable-line
        mailService.updatePersonNotificationsData(userData);
      }
    });
  },
};

module.exports = mailService;
