CREATE TABLE products (
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
)