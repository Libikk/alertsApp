SELECT
  prod.productid "productId",
  CONCAT(website.urlToProduct, prod.productUrl) as "productUrl",
  website.name,
  website.url as "websiteUrl"
FROM
  discouthero.products AS prod
  LEFT JOIN discouthero.scans scan ON scan.scanid = (
    SELECT
      scanLoop.scanid
    FROM
      discouthero.scans AS scanLoop
    WHERE
      scanLoop.productid = prod.productid
    ORDER BY
      scanLoop.createdat DESC
    LIMIT 1
  )
  JOIN discouthero.websites website on website.websiteId = prod.websiteId
WHERE
  scan.ispromo
