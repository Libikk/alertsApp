import React, { useEffect, useState } from 'react'
import { getProductsForManagement } from '../../../dispatchers/productDispatchers';
import { useDispatch } from 'react-redux'

const ProductsManagement = (props) => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])

    useEffect(() => {
        dispatch(getProductsForManagement())
        .then(setProducts)
        .catch(console.error)
    }, [])

    return <div>
        PRODUCTS MANAGEMENT
        {
            products.map(singleProduct => {
                const kurwa = 1;
                return <div>
                    {singleProduct.fullUrl}
                </div>
            })
        }
    </div>
}

export default ProductsManagement