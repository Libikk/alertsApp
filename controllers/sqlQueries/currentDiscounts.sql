SELECT
  prod.productid "productId",
  prod.productUrl as "productUrl",
  website.hostName as "name",
  website.url as "websiteUrl",
  scan.createdat as "checkCreatedAt"
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
