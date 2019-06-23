CREATE TABLE websites (
        websiteId int NOT NULL AUTO_INCREMENT,
        name varchar(255),
        url varchar(10000),
        urlToProduct varchar(10000),
        createdAt TIMESTAMP,
        selector varchar(255),
        regexCheck varchar(255),
        isClientSideCheck BIT,
        PRIMARY KEY (websiteId)