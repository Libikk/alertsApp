
INSERT INTO usersProducts (productId, userId, createdAt, deletedAt)
SELECT * FROM (SELECT @productId, @userId, now(), null) AS tmp

WHERE NOT EXISTS (
    SELECT productId
    FROM usersProducts
    WHERE productId = @productId
	AND userId = @userId
    AND deletedAt is null
) LIMIT 1;
