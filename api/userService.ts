import axiosInstance from '../axiosInstance';

export class UserService {
  static getUserData = async () => axiosInstance.get('/api/user/getUserData').then(response => response);
}
