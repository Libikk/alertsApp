const fs = require('fs');

const getQuery = (queryName) => {
  try {
    return fs.readFileSync(`./controllers/sqlQueries/${queryName}.sql`).toString();
  } catch (err) {
    return null;
  }
};

module.exports = getQuery;
