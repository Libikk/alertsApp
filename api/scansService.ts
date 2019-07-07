import axios from 'axios';

export class ScansService {
  static getCurrentDiscounts = async () => axios.get('http://localhost:3000/api/scans/currentDiscounts').then(response => response.data);
}
