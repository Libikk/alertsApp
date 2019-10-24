const { sqlQuery } = require('../sql/sqlServer');
const result = require('lodash/result');

const activateAccount = async (token) => {
  // make this in one query rather then doing this crap.
  const user = await sqlQuery('getUserFromToken', { '@token': token }).catch(console.error);
  const { affectedRows } = await sqlQuery('activateAccount', { '@token': token }).catch(console.error);
  const isAlreadyActive = result(user.pop(), 'isActive', null);

  const getResultMessage = () => {
    if (isAlreadyActive) return { msg: 'Your account is already active :)' };
    if (affectedRows) return { msg: 'Your account has been activated :)' };
    return { msg: 'Invalid token', isError: true };
  };

  const authRes = {
    isActivated: !!affectedRows,
    isAlreadyActive,
    messageData: getResultMessage(),
  };

  return authRes;
};

module.exports = {
  activateAccount,
};
