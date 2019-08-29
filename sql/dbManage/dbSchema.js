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
          columnName: 'hostName',
          type: 'varchar(255)',
        },
        {
          columnName: 'url',
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
        {
          columnName: 'isActive',
          type: 'BIT',
        },
        {
          columnName: 'imageSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'productNameSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'deletedAt',
          type: 'timestamp',
          defaultValue: null,
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
          columnName: 'imageUrl',
          type: 'varchar(1000)',
        },
        {
          columnName: 'imageSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'productNameSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'isClientSideCheck',
          type: 'bit',
        },
        {
          columnName: 'isActive',
          type: 'bit',
        },
        {
          columnName: 'deletedAt',
          type: 'timestamp',
          defaultValue: null,
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
    {
      tableName: 'users',
      columns: [
        {
          columnName: 'userId',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'userName',
          type: 'varchar(255)',
        },
        {
          columnName: 'password',
          type: 'varchar(255)',
        },
        {
          columnName: 'email',
          type: 'varchar(255)',
        },
        {
          columnName: 'lastLoggedIn',
          type: 'timestamp',
        },
        {
          columnName: 'createdAt',
          type: 'timestamp',
        },
      ],
    },
    {
      tableName: 'usersProducts',
      columns: [
        {
          columnName: 'id',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'userId',
          type: 'int',
        },
        {
          columnName: 'productId',
          type: 'int',
        },
        {
          columnName: 'createdAt',
          type: 'timestamp',
          defaultValue: null,
        },
        {
          columnName: 'deletedAt',
          type: 'timestamp',
          defaultValue: null,
        },
      ],
    },
  ],
};

module.exports = DB_SCHEMA;

