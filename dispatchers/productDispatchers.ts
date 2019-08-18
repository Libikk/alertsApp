// const { sqlQuery } = require('../sql/sqlServer');
import { ProductService } from '../api/productService';


export const checkProdExistence = (productUrlData) => (dispatch) => {
  return ProductService.checkProdExistence(productUrlData)
    .then(res => dispatch({ type: 'CHECK_PRODUCT_EXISTENCE', prodData: res })
)};

export const addUserProduct = (productUrlData) => (dispatch) => {
  return ProductService.addUserProduct(productUrlData)
    .then(res => dispatch({ type: 'ADD_USER_PRODUCT', prodData: res })
 )};

export const getUserProducts = () => (dispatch) => {
  return ProductService.getUserProducts()
    .then(res => dispatch({ type: 'GET_USER_PRODUCTS', prodData: res })
)};