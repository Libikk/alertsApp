SELECT
	  usp.createdAt AS "addedAt",
    prod.productUrl,
    prod.productId,
    web.hostName,
    web.url AS "webUrl",
    case prod.isActive when '0' then 0 when '1' then 1 end AS "isProductActive",
    case scan.isPromo when '0' then 0 when '1' then 1 end AS "isPromo"
FROM discounthero.products prod
JOIN discounthero.usersproducts usp ON usp.userId = ?
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