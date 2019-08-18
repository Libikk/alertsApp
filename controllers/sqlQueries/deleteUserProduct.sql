UPDATE usersproducts
SET deletedAt = now()
WHERE userId = ? AND productId = ? AND deletedAt IS NULL