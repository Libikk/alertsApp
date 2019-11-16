import { WebsiteService } from '../api/websiteService';


export const getWebsitesWithProducts = () => (dispatch) => {
  return WebsiteService.getWebsites()
    .then(res => dispatch({
      type: 'GET_ALL_WEBSITES',
      websites: res,
    }));
};

export const getWebsitesSelectors = () => (dispatch) => {
  dispatch({ type: 'GET_WEBSITES_SELECTORS' });
  return WebsiteService.getWebsitesSelectors()
    .then(res => {
      dispatch({ type: 'SUCCESS_GETTING_WEBSITES_SELECTORS' })
      return res;
  });
};
