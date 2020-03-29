import { ProductService } from '../api/productService';

export const addUserProduct = (productUrlData) => (dispatch) => {
  return ProductService.addUserProduct(productUrlData)
    .then(res => dispatch({ type: 'ADD_USER_PRODUCT', prodData: res })
 )};

export const getUserProducts = () => (dispatch) => {
  return ProductService.getUserProducts()
    .then(res => dispatch({ type: 'GET_USER_PRODUCTS', prodData: res })
)};

export const deleteUserProduct = (productId :number) => (dispatch) => {
  return ProductService.deleteUserProduct(productId)
    .then(res => dispatch({ type: 'DELETE_USER_PRODUCT', productId: productId })
)};