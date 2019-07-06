import axios from 'axios';

export class WebsiteService {
  static getWebsites = async () => axios.get('http://localhost:3000/api/websites/').then(response => response.data);
}
