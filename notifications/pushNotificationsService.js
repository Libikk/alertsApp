const { Sentry } = require('../middleware/errorHandler');
const { Expo } = require('expo-server-sdk');

const expo = new Expo();

const pushNotifications = {
  structurePushNotifications: (peopleData) => {
    const onlyPeopleWithToken = peopleData.filter(({ pushNotificationsToken }) => pushNotificationsToken);

    const structuredPushNotifications = onlyPeopleWithToken.map(singlePerson => ({
      to: singlePerson.pushNotificationsToken,
      sound: 'default',
      title: 'Discounted Products! 🚀',
      body: `Hello ${singlePerson.userName}, there is new ${singlePerson.products.length} discounted products! 😍`,
      data: {
        products: singlePerson.products,
      },
    }));

    return structuredPushNotifications;
  },
  sendPushNotifications: (peopleData) => {
    const structuredPushNotifications = pushNotifications.structurePushNotifications(peopleData);
    console.log('structuredPushNotifications: ', structuredPushNotifications);
    

    return pushNotifications.send(structuredPushNotifications);
  },
  send: async (messages) => {
    /* eslint-disable */
    // /////////////
    // // TO DO ////
    // /////////////
    // THIS IF FUCKING CRAP, GOD BLESS AUTHOR...
    
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
          Sentry.withScope((scope) => {
            scope.setExtra('data', { chunk });
            Sentry.captureException(error);
          });
        }
      }

    const receiptIds = tickets.reduce((acc, { id }) => acc.concat(id || []), []);

    const receiptIdChunks = await expo.chunkPushNotificationReceiptIds(receiptIds);
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (const chunk of receiptIdChunks) {
          const receipts = await expo.getPushNotificationReceiptsAsync(chunk)
          .catch(err => {
            Sentry.withScope((scope) => {
              scope.setExtra('data', { chunk });
              Sentry.captureException(err);
            });
          });
         
          
          if (receipts.status !== 'ok') {
            Sentry.withScope((scope) => {
              scope.setExtra('data', { receipts, tickets, chunk });
              Sentry.captureException(new Error('Receipt error'));
            });
          } else {
            console.log('Notification has been sent sucessfully: ', receipts);
          }
      }
  },
};

module.exports = pushNotifications;
