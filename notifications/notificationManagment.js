const { sqlQuery } = require('../sql/sqlServer');
const { sendProductNotificationsAgain } = require('../appConfig');

const notifications = {
  getPeopleToSendNotifications: async () => {
    // query performance check
    const peopleData = await sqlQuery('getDataToSendNotifications', [sendProductNotificationsAgain]);
    console.log('peopleData: ', peopleData);
  },
};

notifications.getPeopleToSendNotifications()

module.exports = notifications;
