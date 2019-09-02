UPDATE usersProducts
SET deletedAt = now()
WHERE userId = ? AND productId = ? AND deletedAt IS NULL