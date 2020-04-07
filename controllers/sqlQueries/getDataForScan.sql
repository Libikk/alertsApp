SELECT
    prod.productId,
    web.websiteId,
    prod.productUrl as "fullUrl",
    CASE WHEN ps.isDiscountSelector IS NOT NULL THEN ps.isDiscountSelector ELSE ws.isDiscountSelector END AS "selectorString",
    CASE WHEN ps.isDiscountSelectorRegex IS NOT NULL THEN ps.isDiscountSelectorRegex ELSE ws.isDiscountSelectorRegex END AS "isDiscountSelectorRegex",
    CASE WHEN ps.isClientSideCheck IS NOT NULL THEN ps.isClientSideCheck ELSE ws.isClientSideCheck END AS "isClientSideCheck",
	CASE WHEN ps.imageSelector IS NOT NULL THEN ps.imageSelector ELSE ws.imageSelector END AS "imageSelector",
    CASE WHEN ps.productNameSelector IS NOT NULL THEN ps.productNameSelector ELSE ws.productNameSelector END AS "productNameSelector",
	CASE WHEN ps.productPriceSelector IS NOT NULL THEN ps.productPriceSelector ELSE ws.productPriceSelector END AS "productPriceSelector",
    CASE WHEN ps.productDiscountedPriceSelector IS NOT NULL THEN ps.productDiscountedPriceSelector ELSE ws.productDiscountedPriceSelector END AS "productDiscountedPriceSelector"
FROM discounthero.products prod
JOIN discounthero.websites web on prod.websiteId = web.websiteId
JOIN discounthero.websitesSelectors ws ON ws.websiteId = web.websiteId
LEFT JOIN discounthero.productsSelectors ps ON ps.productId = prod.productId 
WHERE web.isActive = 1
    AND prod.isActive = 1
    AND (CASE WHEN @productId IS NULL THEN true ELSE prod.productId = @productId END)