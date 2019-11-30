SELECT
	id,
    case webSel.isClientSideCheck WHEN '0' THEN 0 WHEN '1' THEN 1 END AS 'isClientSideCheck',
    isDiscountSelectorRegex,
    isDiscountSelector,
    imageSelector,
    productNameSelector,
    productPriceSelector,
    productDiscountedPriceSelector,
    web.hostName,
    web.url
FROM websitesSelectors webSel
JOIN websites web on web.websiteId = webSel.websiteId;