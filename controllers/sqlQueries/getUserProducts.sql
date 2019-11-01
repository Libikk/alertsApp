SELECT
	  usp.createdAt,
    prod.productUrl,
    prod.productId,
    prod.imageUrl,
    prod.productName,
    web.hostName,
    web.url AS "hostNameUrl",
    case prod.isActive when '0' then 0 when '1' then 1 end AS "isActive",
    case scan.isPromo when '0' then 0 when '1' then 1 end AS "isPromo",
    scan.productDiscountedPrice,
    scan.productPrice
FROM discounthero.products prod
JOIN discounthero.usersProducts usp ON usp.userId = ?
	AND usp.deletedAt IS NULL
	AND prod.productId = usp.productId
JOIN discounthero.websites web on web.websiteId = prod.websiteId
LEFT JOIN discounthero.scans scan on scan.scanId = (
    SELECT
      scanLoop.scanid
    FROM
      discounthero.scans AS scanLoop
    WHERE
      scanLoop.productid = prod.productid
    ORDER BY
      scanLoop.createdat DESC
    LIMIT 1
  )