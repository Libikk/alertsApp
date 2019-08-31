import axiosInstance from '../axiosInstance';
export class WebsiteService {
  static getWebsites = async () => axiosInstance.get('/api/websites/').then(response => response.data);
}
