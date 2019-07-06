// const { sqlQuery } = require('../sql/sqlServer');
import { WebsiteService } from '../api/websiteService';


export const getWebsitesWithProducts = () => (dispatch) => {
  WebsiteService.getWebsites()
    .then(res => dispatch({
      type: 'GET_ALL_WEBSITES_WITH_PRODUCTS',
      websites: res,
    }));
};
