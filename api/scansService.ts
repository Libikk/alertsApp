import axiosInstance from '../axiosInstance';

export class ScansService {
  static getCurrentDiscounts = async () => axiosInstance.get('/api/scans/currentDiscounts').then(response => response.data);

  static testProductsScan = async (data) => axiosInstance.post('/api/scans/testProductsScan', data).then(response => response.data);

}
