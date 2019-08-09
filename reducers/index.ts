import { combineReducers } from 'redux';

import websites from './websitesReducer';
import scans from './scansReducer';
import user from './userReducer';
import auth from './authReducer';
import products from './productReducer';

export default combineReducers({
  websites,
  scans,
  user,
  auth,
  products
});
