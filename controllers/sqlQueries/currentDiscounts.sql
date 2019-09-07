SELECT
  prod.productid,
  prod.productUrl,
  website.hostName,
  website.url as "hostNameUrl",
  prod.imageUrl,
  prod.productName,
  scan.createdAt
FROM
  discounthero.products AS prod
  LEFT JOIN discounthero.scans scan ON scan.scanid = (
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
  JOIN discounthero.websites website on website.websiteId = prod.websiteId
WHERE
  scan.ispromo
  AND website.isActive = '1'
  AND prod.isActive = '1'
