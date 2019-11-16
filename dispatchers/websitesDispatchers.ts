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

export const updateWebsiteSelector = (data) => (dispatch) => {
  dispatch({ type: 'UPDATE_WEBSITES_SELECTORS' });
  return WebsiteService.updateWebsiteSelector(data)
    .then(res => {
      dispatch({ type: 'SUCCESS_UPDATE_WEBSITES_SELECTORS' })
      return res;
  });
};
