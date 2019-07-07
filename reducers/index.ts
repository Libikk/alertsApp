import { combineReducers } from 'redux';

import websites from './websitesReducer';
import scans from './scansReducer';

export default combineReducers({
  websites,
  scans,
});
