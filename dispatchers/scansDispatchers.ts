import { ScansService } from '../api/scansService';


export const getCurrentDiscounts = () => (dispatch) => {
  return ScansService.getCurrentDiscounts()
    .then(currentDiscounts => dispatch({
      type: 'GET_CURRENT_DISCOUNTS',
      currentDiscounts,
    }));
};
