import axiosInstance from '../axiosInstance';
export class WebsiteService {
  static getWebsites = async () => axiosInstance.get('/api/websites/').then(response => response.data);

  static getWebsitesSelectors = async () => axiosInstance.get('/api/websites/websitesSelectors').then(response => response.data);

  static updateWebsiteSelector = async (data) => axiosInstance.post('/api/websites/updateWebsiteSelector', data).then(response => response.data);
}
