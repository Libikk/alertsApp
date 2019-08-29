SELECT
    productId,
    web.websiteId,
    prod.productUrl as "fullUrl",
    IFNULL(prod.regexCheck, web.regexCheck) AS "regex",
    IFNULL(prod.selector, web.selector) AS "selectorString",
    (case IFNULL(prod.isClientSideCheck, web.isClientSideCheck) WHEN '0' THEN 0 WHEN '1' THEN 1 END) AS "isClientSideCheck",
    web.imageSelector,
    web.productNameSelector
FROM discounthero.products prod
JOIN discounthero.websites web on prod.websiteId = web.websiteId
WHERE web.isActive = '1'
    AND prod.isActive = '1'
    AND (CASE WHEN @productId IS NULL THEN true ELSE prod.productId = @productId END)