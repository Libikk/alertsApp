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
          defaultValue: null,
        },
        {
          columnName: 'isActive',
          type: 'BIT',
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
          defaultValue: null,
        },
        {
          columnName: 'imageUrl',
          type: 'varchar(1000)',
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
          defaultValue: null,
        },
        {
          columnName: 'isPromo',
          type: 'bit',
        },
        {
          columnName: 'productPrice',
          type: 'varchar(255)',
        },
        {
          columnName: 'productDiscountedPrice',
          type: 'varchar(255)',
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
          columnName: 'role',
          type: 'varchar(55)',
        },
        {
          columnName: 'lastLoggedIn',
          type: 'timestamp',
          defaultValue: null,
        },
        {
          columnName: 'activationToken',
          type: 'varchar(255)',
          defaultValue: null,
        },
        {
          columnName: 'activationTokenSentDate',
          type: 'timestamp',
          defaultValue: null,
        },
        {
          columnName: 'active',
          type: 'bit',
        },
        {
          columnName: 'createdAt',
          type: 'timestamp',
          defaultValue: null,
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
    {
      tableName: 'websitesSelectors',
      columns: [
        {
          columnName: 'id',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'websiteId',
          type: 'int',
        },
        {
          columnName: 'isDiscountSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'isDiscountSelectorRegex',
          type: 'varchar(255)',
        },
        {
          columnName: 'isClientSideCheck',
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
          columnName: 'productPriceSelector',
          type: 'varchar(255)',
        },
        {
          columnName: 'productDiscountedPriceSelector',
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
      tableName: 'notifications',
      columns: [
        {
          columnName: 'id',
          type: 'int',
          primary: true,
        },
        {
          columnName: 'productId',
          type: 'int',
        },
        {
          columnName: 'userId',
          type: 'int',
        },
        {
          columnName: 'sentNotificationDate',
          type: 'timestamp',
          defaultValue: null,
        },
      ],
    },
    {
      tableName: 'usersNotifications',
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
          columnName: 'emailNotifications',
          type: 'BIT',
        },
        {
          columnName: 'mobileAppNotifications',
          type: 'BIT',
        },
        {
          columnName: 'smsNotifications',
          type: 'BIT',
        },
        {
          columnName: 'updatedAt',
          type: 'timestamp',
          defaultValue: 'CURRENT_TIMESTAMP',
        },
      ],
    },
  ],
};

module.exports = DB_SCHEMA;

