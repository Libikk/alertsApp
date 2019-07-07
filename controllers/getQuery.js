const fs = require('fs');

const getQuery = queryName => fs.readFileSync(`./controllers/sqlQueries/${queryName}.sql`).toString();

module.exports = getQuery;
