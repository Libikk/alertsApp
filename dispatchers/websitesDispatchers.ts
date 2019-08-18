// const { sqlQuery } = require('../sql/sqlServer');
import { WebsiteService } from '../api/websiteService';


export const getWebsitesWithProducts = () => (dispatch) => {
  return WebsiteService.getWebsites()
    .then(res => dispatch({
      type: 'GET_ALL_WEBSITES',
      websites: res,
    }));
};
