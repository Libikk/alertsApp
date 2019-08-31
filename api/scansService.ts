import axiosInstance from '../axiosInstance';

export class ScansService {
  static getCurrentDiscounts = async () => axiosInstance.get('/api/scans/currentDiscounts').then(response => response.data);
}
