SELECT
    productId,
    web.websiteId,
    prod.productUrl as "fullUrl",
    IFNULL(prod.regexCheck, web.regexCheck) as "regex",
    IFNULL(prod.selector, web.selector) as "selectorString",
    (case IFNULL(prod.isClientSideCheck, web.isClientSideCheck) when '0' then 0 when '1' then 1 end) as "isClientSideCheck"
FROM discounthero.products prod
JOIN discounthero.websites web on prod.websiteId = web.websiteId
WHERE web.isActive = '1' and prod.isActive = '1'