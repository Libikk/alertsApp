const { sql, sqlQuery } = require('../sqlServer');
const dbSchema = require('./dbSchema');

const createOrUpdateTables = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const { tableName, columns } of dbSchema.tables) {
    const primaryColumn = columns.find(c => c.primary);
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${primaryColumn.columnName} INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (${primaryColumn.columnName}))`;
    await sqlQuery(query);

    // eslint-disable-next-line no-restricted-syntax
    for (const { columnName, type } of columns) {
      await sqlQuery(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
        .catch(() => sqlQuery(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`));
    }
  }
};

createOrUpdateTables().then(() => sql.end());

