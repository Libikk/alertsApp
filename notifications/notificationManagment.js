const { sqlQuery } = require('../sql/sqlServer');
const _ = require('lodash');
const { sendProductNotificationsAgain } = require('../appConfig');
const { sendProductsNotifications } = require('./mailService');

const notifications = {
  getPeopleToSendNotifications: async () => {
    // query performance check
    const peopleData = await sqlQuery('getDataToSendNotifications', [sendProductNotificationsAgain]);
    const parsedPeopleData = peopleData.reduce((acc, nextProductData) => {
      const userData = acc.find(({ userId }) => userId === nextProductData.userId);
      if (userData) {
        return acc.map((singlePerson) => {
          if (nextProductData.userId === singlePerson.userId) {
            return Object.assign(singlePerson, {
              products: singlePerson.products.concat(_.pick(nextProductData, ['productUrl', 'hostNameUrl', 'imageUrl', 'productName', 'userName'])),
            });
          }
          return singlePerson;
        });
      }

      return acc.concat({
        ..._.pick(nextProductData, ['userId', 'email', 'emailNotifications', 'mobileAppNotifications', 'smsNotifications', 'userName']),
        products: [
          _.pick(nextProductData, ['productUrl', 'hostNameUrl', 'imageUrl', 'productName']),
        ],
      });
    }, []);
    return parsedPeopleData;
  },
  sendNotifications: async () => {
    const peopleData = await notifications.getPeopleToSendNotifications();
    return peopleData.map((singlePerson) => {
      if (singlePerson.emailNotifications) {
        sendProductsNotifications(singlePerson);
      }
      return null;
    });
  },
};

module.exports = notifications;
