UPDATE websitesSelectors
SET
    isDiscountSelectorRegex = @isDiscountSelectorRegex,
    isClientSideCheck = @isClientSideCheck,
    isDiscountSelector = @isDiscountSelector,
    imageSelector = @imageSelector,
    productNameSelector = @productNameSelector,
    productPriceSelector = @productPriceSelector,
    productDiscountedPriceSelector = @productDiscountedPriceSelector
WHERE
    id = @id;