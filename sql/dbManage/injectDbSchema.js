const { sql, sqlQuery } = require('../sqlServer');
const dbSchema = require('./dbSchema');

const DB_UPDATE_CONFIG = {
  dropExistingTables: false,
};


const createOrUpdateTables = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const { tableName, columns } of dbSchema.tables) {

    if (DB_UPDATE_CONFIG.dropExistingTables) {
      await sqlQuery(`DROP TABLE IF EXISTS ${tableName}`);
    }


    const primaryColumn = columns.find(c => c.primary);
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${primaryColumn.columnName} int NOT NULL AUTO_INCREMENT, PRIMARY KEY (${primaryColumn.columnName}))`;
    await sqlQuery(query);
    // eslint-disable-next-line no-restricted-syntax
    for (const { columnName, type, primary } of columns) {
      if (!primary) {
        await sqlQuery(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
          .catch(() => sqlQuery(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`));
      }

    }
  }
};

createOrUpdateTables().then(() => sql.end());

