const { envUrl } = require('../../appConfig');

const emailLayout = (body, to, from = 'notification@DDiscounthero.com') => ({
  from, // Sender address
  to, // List of recipients
  subject: 'New discounts on DDiscountHero.com!', // Subject line
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
                      <strong>© 2019 <a href="${envUrl}">DDiscountHero.com</a></strong>
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
    path: `${__dirname}/../../static/images/logo.png`,
    cid: 'portalLogo',
  }],
});

const composeUserProductsIntoHTML = ({ userName, products }) => {
  const productsHtml = products.map(({ productUrl, imageUrl, productName, hostNameUrl }) => `
  <div style="box-shadow: -10px 0 25px -15px black, 10px 0 25px -15px black; padding: 10px; max-width: 250px;">
    <h3 style="width: 75%; margin: 4% auto;">
      <a href="${productUrl}">${productName}</a>
    </h3>
    <img src="${imageUrl}" alt="${productName}" style="width: 100%; max-width: 200px;"/>
    <p>from: ${hostNameUrl}</p>
  </div>`);
  return `
    <div>
    <h1>Hello ${userName}</h1>
    <h3>This is list of current discounts:</h3>
      <div style="display: flex; margin: 20px 0; padding: 0; flex-wrap: wrap; justify-content: space-around;" >
        ${productsHtml.join('')}
      </div>
    </div>
  `;
};

const activationTokenTemplate = (activationToken, email, userName) => `
  <div>
    <h1>Hello ${userName}</h1>
    </br>
    <p>To activate your account, please visit:</p>
    <p><a href="${envUrl}/auth/activateAccount/${activationToken}">${envUrl}/auth/activateAccount/${activationToken}</a></p>
    <p>If you have problems activating your account, please contact support (help@DDiscounthero.com).</p>
  </div>
`;

module.exports = { emailLayout, composeUserProductsIntoHTML, activationTokenTemplate };