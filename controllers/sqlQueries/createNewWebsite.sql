INSERT INTO websites (hostName, url, createdAt, isActive, deletedAt)
SELECT * FROM (SELECT @host, @hostUrl, now(), 0, NULL) AS tmp
WHERE NOT EXISTS (
    SELECT hostName FROM websites WHERE hostName = @host
) LIMIT 1;

/* create selector row template for created website */
SET @newWebsiteId = @@IDENTITY;
INSERT INTO websitesSelectors (websiteId, isClientSideCheck, deletedAt)
SELECT * FROM (SELECT @newWebsiteId, 1, NULL) AS tmp
WHERE EXISTS (
    SELECT websiteId
    FROM websites
    WHERE websiteId = @newWebsiteId
) LIMIT 1;
