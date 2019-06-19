SELECT
    productId,
    web.websiteId,
    CONCAT(web.urlToProduct, prod.productUrl) as "fullUrl",
    IFNULL(prod.regexCheck, web.regexCheck) as "regex",
    IFNULL(prod.selector, web.selector) as "selectorString",
    IFNULL(prod.isClientSideCheck, web.isClientSideCheck) as "isClientSideCheck"
FROM discouthero.products prod
JOIN discouthero.websites web on prod.websiteId = web.websiteId