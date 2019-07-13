const { sql, sqlQuery } = require('../sqlServer');
const seedConfig = require('./seedConfig');
const _ = require('lodash');
const dbSchema = require('./dbSchema');

const dropExistingTables = async () => {
  const promises = [];
  Object.keys(seedConfig).forEach((tableName) => {
    promises.push(sql.query(`DROP TABLE IF EXISTS ${tableName}`));
  });
  return Promise.all(promises);
};

const createOrUpdateTables = async () => {
  const tables = [`CREATE TABLE websites (
        websiteId int NOT NULL AUTO_INCREMENT,
        name varchar(255),
        url varchar(10000),
        urlToProduct varchar(10000),
        createdAt TIMESTAMP,
        selector varchar(255),
        regexCheck varchar(255),
        isClientSideCheck BIT,
        PRIMARY KEY (websiteId)
      )`,
    // 'CREATE TABLE IF NOT EXISTS websites (websiteId INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (websiteId))'
    // 'CREATE TABLE               websites (websiteId int NOT NULL AUTO_INCREMENT, PRIMARY KEY (websiteId))'
  `CREATE TABLE products (
        productId int NOT NULL AUTO_INCREMENT,
        websiteId int NOT NULL,
        productName varchar(255),
        url varchar(10000),
        productUrl varchar(10000),
        createdAt TIMESTAMP,
        selector varchar(255),
        regexCheck varchar(255),
        isClientSideCheck BIT,
        PRIMARY KEY (productId)
      )`,

  `CREATE TABLE scans (
        scanId int NOT NULL AUTO_INCREMENT,
        productId int NOT NULL,
        createdAt TIMESTAMP,
        isPromo BIT,
        isError BIT,
        PRIMARY KEY (scanId)
      )`,
  ];

  tables.forEach(singleTable => sqlQuery(singleTable));

  // eslint-disable-next-line no-restricted-syntax
  // for (const { tableName, columns } of dbSchema.tables) {
  //   const primaryColumn = columns.find(c => c.primary);
  //   const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${primaryColumn.columnName} ${primaryColumn.type} NOT NULL AUTO_INCREMENT, PRIMARY KEY (${primaryColumn.columnName}))`;
  //   console.log('query: ', query);
  //   await sqlQuery(query);

  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const { columnName, type } of columns) {
  //     await sqlQuery(`ALTER TABLE ${tableName} MODIFY COLUMN ${columnName} ${type}`)
  //       .catch(async () => {
  //         await sqlQuery(`ALTER TABLE ${tableName} ADD ${columnName} ${type}`);
  //       });
  //   }
  // }
};

const createRows = () => {
  const promises = _.mapKeys(seedConfig, async (tableSeedValues, tableKey) =>
    // eslint-disable-next-line no-restricted-syntax
     tableSeedValues.map((element) => {
      const stringOfColumns = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${curColumn}` : `, ${curColumn}`), '');
      const stringOfValues = Object.keys(element).reduce((acc, curColumn, index) => acc + (index === 0 ? `${element[curColumn]}` : `, ${element[curColumn]}`), '');
      const query = `INSERT INTO ${tableKey} (${stringOfColumns})
      VALUES (${stringOfValues})`;
      return sql.query(query);
    })
  );
  return Promise.all(promises).catch(console.error);
};

const execute = async () => {
  await dropExistingTables();
  console.log('Drop has been complited!');
  await createOrUpdateTables();
  console.log('Create/Update tables and columns has been complited!');
  await createRows();
  console.log('DB seed has been completed!');
  await sql.end();
};
// sql.end();
execute();


/*
1. check if table exist
  - if exist update if name is different
  - if not then create
*/

/*
2. check if column exist
  - if exist update if name is different
  - if not then create
*/
