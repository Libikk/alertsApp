import { combineReducers } from 'redux';

import websites from './websitesReducer';
import scans from './scansReducer';
import user from './userReducer';

export default combineReducers({
  websites,
  scans,
  user
});
