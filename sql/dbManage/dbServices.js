const { sql, sqlQuery } = require('../sqlServer');
const dbSchema = require('./dbSchema');
const seedConfig = require('./seedConfig');
const _ = require('lodash');

const DB_UPDATE_CONFIG = {
  dropExistingTables: false,
  createSeedRows: false,
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
  for (const { columnName, defaultValue, type, primary } of columns) {
    if (!primary) {
      createdColumns.push(columnName);
      await sqlQuery(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
        .catch(() => sqlQuery(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`).catch(console.error));

      // set default value if exist
      if (defaultValue !== undefined) {
        await sqlQuery(`ALTER TABLE ${tableName} CHANGE ${columnName} ${columnName} ${type} ${defaultValue} DEFAULT ${defaultValue};`);
      }
    }
  }
};

const createSeedRows = async () => {
  await _.mapKeys(seedConfig, async (tableSeedValues, tableKey) =>
    tableSeedValues.map(async (element) => {
      const stringOfColumns = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${curColumn}` : `, ${curColumn}`), '');
      const stringOfValues = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${element[curColumn]}` : `, ${element[curColumn]}`), '');
      const query = `INSERT INTO ${tableKey} (${stringOfColumns}) VALUES (${stringOfValues})`;
      await sqlQuery(query);
    }));
};


const createOrUpdateTables = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const { tableName, columns } of dbSchema.tables) {
    if (DB_UPDATE_CONFIG.dropExistingTables) await dropTable(tableName);
    await createTableIfNotExist(tableName, columns);
    await createColumnsForTable(tableName, columns);
  }
  if (DB_UPDATE_CONFIG.createSeedRows) await createSeedRows();
};


createOrUpdateTables().then(() => sql.end());

