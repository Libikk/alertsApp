// const { sqlQuery } = require('../sql/sqlServer');
import { ProductService } from '../api/productService';


export const checkProdExistence = (productUrlData) => (dispatch) => {
  return ProductService.checkProdExistence(productUrlData)
    .then(res => dispatch({ type: 'CHECK_PRODUCT_EXISTENCE', prodData: res })
);
};
