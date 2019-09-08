SELECT
    productId,
    web.websiteId,
    prod.productUrl as "fullUrl",
	webSelectors.isDiscountSelectorRegex AS "regex",
	webSelectors.isDiscountSelector AS "selectorString",
	webSelectors.isClientSideCheck,
    web.imageSelector,
	webSelectors.productNameSelector
FROM discounthero.products prod
JOIN discounthero.websites web on prod.websiteId = web.websiteId
JOIN discounthero.websitesSelectors webSelectors ON webSelectors.websiteId = web.websiteId
WHERE web.isActive = 1
    AND prod.isActive = 1
    AND (CASE WHEN @productId IS NULL THEN true ELSE prod.productId = @productId END)