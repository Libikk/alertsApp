// productId int NOT NULL AUTO_INCREMENT,
// websiteId int NOT NULL,
// productName varchar(255),
// url varchar(10000),
// productUrl varchar(10000),
// createdAt TIMESTAMP,
// selector varchar(255),
// regexCheck varchar(255),
// isClientSideCheck BIT,
// PRIMARY KEY (productId)

const DB_SCHEMA = {
  dbName: 'discountHero',
  tables: [
    {
      tableName: 'websites',
      columns: [
        {
          columnName: 'websiteId',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'name',
          type: 'varchar(255)',
        },
        {
          columnName: 'url',
          type: 'varchar(10000)',
        },
        {
          columnName: 'urlToProduct',
          type: 'varchar(10000)',
        },
        {
          columnName: 'createdAt',
          type: 'TIMESTAMP',
        },
        {
          columnName: 'selector',
          type: 'varchar(255)',
        },
        {
          columnName: 'regexCheck',
          type: 'varchar(255)',
        },
        {
          columnName: 'isClientSideCheck',
          type: 'BIT',
        },
      ],
    },
    {
      tableName: 'products',
      columns: [
        {
          columnName: 'productId',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'websiteId',
          type: 'int',
        },
        {
          columnName: 'productName',
          type: 'varchar(255)',
        },
        {
          columnName: 'url',
          type: 'varchar(10000)',
        },
        {
          columnName: 'productUrl',
          type: 'varchar(10000)',
        },
        {
          columnName: 'createdAt',
          type: 'TIMESTAMP',
        },
      ],
    },
  ],
};

module.exports = DB_SCHEMA;

