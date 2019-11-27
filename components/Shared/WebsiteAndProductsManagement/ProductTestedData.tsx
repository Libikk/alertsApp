import React, { useState, useEffect } from 'react';
import ProductList from '../ProductsList';
import flatter from 'lodash/flatten';
import Button from '@material-ui/core/Button';
import '../../../styles/productTestedData.scss'

interface testDataTypes {
    discountedProductUrl: string,
    fullUrl: string,
    hostName: string,
    id: number,
    imageSelector: string,
    imgUrl: string,
    isClientSideCheck: number,
    isDiscountSelector: string,
    isDiscountSelectorRegex: string,
    isPromo: boolean
    notDiscountedProductUrl: string,
    productDiscountedPrice: string,
    productDiscountedPriceSelector: string,
    productName: string,
    productNameSelector: string,
    productPriceSelector: string,
    regex: string,
    selectorString: string,
    tableData: {
        id: number,
        checked: boolean
    },
    url: string,

}

interface propsTypes {
    testData: testDataTypes[],
    onModalClose: Function
}

const ProductTestedData = (props: propsTypes) => {
    const parseData = props.testData.reduce((acc, nextObj)=> {
        const isIncludedAlready = flatter(acc).find(({ id }) => nextObj.id === id)
        if (isIncludedAlready) {
            return acc;
        }
        const findAnotherPair = props.testData.find(({ id, fullUrl }) => nextObj.id === id && fullUrl !== nextObj.fullUrl);

        const paired = [findAnotherPair, nextObj]
        return acc.concat([paired])
    }, [])

    return <div>
            <ul className="product-tested-data">
                {
                    parseData.map((singlePair) => {
                        return <li className="product-tested-data__single-element">
                                <ProductList products={singlePair}  pageName="landingPage"/>
                        </li>

                    })
                }
        </ul>
        <Button onClick={props.onModalClose}>Close</Button>
    </div>

}

export default ProductTestedData