const { sqlQuery } = require('../sql/sqlServer');
const _ = require('lodash');
const { sendProductNotificationsAgain } = require('../appConfig');

const notifications = {
  getPeopleToSendNotifications: async () => {
    // query performance check
    const peopleData = await sqlQuery('getDataToSendNotifications', [sendProductNotificationsAgain]);
    const parsedPeopleData = peopleData.reduce((acc, nextProductData) => {
      const userData = acc.find(e => e.userId === nextProductData.userId);
      if (userData) {
        return acc.map((singlePerson) => {
          if (nextProductData.userId === singlePerson.userId) {
            return Object.assign(singlePerson, {
              products: singlePerson.products.concat(_.pick(nextProductData, ['productUrl', 'hostNameUrl', 'imageUrl', 'productName', 'smsNotifications'])),
            });
          }
          return singlePerson;
        });
      }

      return acc.concat({
        ..._.pick(nextProductData, ['userId', 'email', 'emailNotifications', 'mobileAppNotifications', 'smsNotifications']),
        products: [
          _.pick(nextProductData, ['productUrl', 'hostNameUrl', 'imageUrl', 'productName']),
        ],
      });
    }, []);
    console.log('peopleData: ', parsedPeopleData);
    return parsedPeopleData;
  },
};

notifications.getPeopleToSendNotifications();

module.exports = notifications;
