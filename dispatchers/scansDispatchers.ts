import { ScansService } from '../api/scansService';


export const getCurrentDiscounts = () => (dispatch) => {
  return ScansService.getCurrentDiscounts()
    .then(currentDiscounts => dispatch({
      type: 'GET_CURRENT_DISCOUNTS',
      currentDiscounts,
    }));
};

export const testProductsScan = (productsData) => (dispatch) => {
  dispatch({ type: 'TEST_PRODUCTS_SCAN' })
  return ScansService.testProductsScan(productsData)
    .then(() =>  dispatch({ type: 'SUCCESS_TEST_PRODUCTS_SCAN' }));
};
