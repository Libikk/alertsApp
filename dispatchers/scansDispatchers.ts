// const { sqlQuery } = require('../sql/sqlServer');
import { ScansService } from '../api/ScansService';


export const getCurrentDiscounts = () => (dispatch) => {
  return ScansService.getCurrentDiscounts()
    .then(currentDiscounts => dispatch({
      type: 'GET_CURRENT_DISCOUNTS',
      currentDiscounts,
    }));
};
