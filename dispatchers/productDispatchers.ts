// const { sqlQuery } = require('../sql/sqlServer');
import { ProductService } from '../api/productService';


export const getCurrentDiscounts = (productUrlData) => (dispatch) => {
    console.log('productUrlData: ', productUrlData);
  return ProductService.checkProdExistence(productUrlData)
    .then(res => {
        console.log('ressponse data: ', res);
        dispatch({
      type: 'CHECK_PRODUCT_EXISTENCE',
      prodData: res.data,
    })
});
};
