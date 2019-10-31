UPDATE products p
SET
    p.imageUrl = ?,
    p.productName = ?
WHERE
    p.productId = ?
    AND (
        p.imageUrl IS NULL
        OR p.productName IS NULL
    )