SELECT
    p.productId,
    p.productUrl,
    we.hostName,
    p.productName,
    p.createdAt
FROM discounthero.products p
JOIN discounthero.websites we on p.websiteId = we.websiteId
WHERE p.productUrl = ?