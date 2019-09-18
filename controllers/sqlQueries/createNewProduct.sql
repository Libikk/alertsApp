INSERT INTO products (productUrl, createdAt, isActive, websiteId)
SELECT * FROM (SELECT @productUrl, NOW(), 0, websiteId
FROM websites
WHERE hostName = @hostName) AS tmp

WHERE NOT EXISTS (
    SELECT productId
    FROM products
    WHERE productUrl = @productUrl
) LIMIT 1;
