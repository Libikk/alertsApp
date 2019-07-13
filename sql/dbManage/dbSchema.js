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
          type: 'bit',
        },
      ],
    },
    {
      tableName: 'scans',
      columns: [
        {
          columnName: 'scanId',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'productId',
          type: 'int',
        },
        {
          columnName: 'createdAt',
          type: 'timestamp',
        },
        {
          columnName: 'isPromo',
          type: 'bit',
        },
        {
          columnName: 'isError',
          type: 'bit',
        },
      ],
    },
  ],
};

module.exports = DB_SCHEMA;

