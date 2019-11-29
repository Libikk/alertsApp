const mysqldump = require('mysqldump');
require('dotenv').config();
const { env } = require('../appConfig');
const moment = require('moment');
const sqlCredential = require('./sqlCredential');
const { Sentry } = require('../middleware/errorHandler');
const fs = require('fs');


const dbBackupPath = '../dbBackups';
const backupDate = moment().format('DD-MM-YYYY___H-m-s');
if (!fs.existsSync(dbBackupPath)) fs.mkdirSync(dbBackupPath);

const options = {
  connection: sqlCredential[env],
  dumpToFile: `${dbBackupPath}/${backupDate}.sql`,
};

mysqldump(options)
  .then((res) => {
    console.log('DB backup has been saved successfully!');
  })
  .catch((err) => {
    console.error('DB backup has failed!', err);
    Sentry.withScope((scope) => {
      scope.setExtra('data', { options });
      Sentry.captureException(err);
    });
  });
