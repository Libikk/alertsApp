SELECT
	id,
    case webSel.isClientSideCheck WHEN '0' THEN 0 WHEN '1' THEN 1 END AS 'isClientSideCheck',
    isDiscountSelector,
    isDiscountSelectorRegex,
    imageSelector,
    productNameSelector,
    productPriceSelector,
    productDiscountedPriceSelector,
    web.hostName,
    web.url
FROM websitesselectors webSel
JOIN websites web on web.websiteId = webSel.websiteId;