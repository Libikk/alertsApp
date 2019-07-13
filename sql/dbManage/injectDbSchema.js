const { sql, sqlQuery } = require('../sqlServer');
const dbSchema = require('./dbSchema');

const DB_UPDATE_CONFIG = {
  dropExistingTables: true,
};

const dropTable = (tableName) => {
  console.warn(`Drop table: ${tableName}`);
  return sqlQuery(`DROP TABLE IF EXISTS ${tableName}`);
};

const createTableIfNotExist = (tableName, columns) => {
  console.warn(`Create or update table: ${tableName}`);
  const { columnName } = columns.find(c => c.primary);
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnName} int NOT NULL AUTO_INCREMENT, PRIMARY KEY (${columnName}))`;
  return sqlQuery(query);
};

const createColumnsForTable = async (tableName, columns) => {
  const createdColumns = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const { columnName, type, primary } of columns) {
    if (!primary) {
      createdColumns.push(columnName);
      await sqlQuery(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
        .catch(() => sqlQuery(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`));
    }
  }
  console.warn(`Created columns in ${tableName}: `, createdColumns.join(', '));
};


const createOrUpdateTables = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const { tableName, columns } of dbSchema.tables) {
    if (DB_UPDATE_CONFIG.dropExistingTables) await dropTable(tableName);
    await createTableIfNotExist(tableName, columns);
    await createColumnsForTable(tableName, columns);
  }
};

createOrUpdateTables().then(() => sql.end());

