const { sql, executeRawSQL } = require('../sqlServer');
const dbSchema = require('./dbSchema');
const seedConfig = require('./seedConfig');
const _ = require('lodash');

const DB_UPDATE_CONFIG = {
  dropExistingTables: false,
  createSeedRows: false,
};

const dropTable = (tableName) => {
  console.warn(`Drop table: ${tableName}`);
  return executeRawSQL(`DROP TABLE IF EXISTS ${tableName}`);
};

const createTableIfNotExist = (tableName, columns) => {
  console.warn(`Create or update table: ${tableName}`);
  const { columnName } = columns.find(c => c.primary);
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnName} int NOT NULL AUTO_INCREMENT, PRIMARY KEY (${columnName}))`;
  return executeRawSQL(query);
};

const createColumnsForTable = async (tableName, columns) => {
  const createdColumns = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const { columnName, defaultValue, type, primary } of columns) {
    if (!primary) {
      createdColumns.push(columnName);
      await executeRawSQL(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
        .catch(() => executeRawSQL(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`));

      // set default value if exist
      if (defaultValue !== undefined) {
        await executeRawSQL(`ALTER TABLE ${tableName} CHANGE ${columnName} ${columnName} ${type} ${defaultValue} DEFAULT ${defaultValue};`);
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
      await executeRawSQL(query);
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

