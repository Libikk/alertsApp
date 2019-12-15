import axiosInstance from '../axiosInstance';

export class UserService {
  static getUserData = async () => axiosInstance.get('/api/user/getUserData').then(response => response);

  static updateUserDetails = async (data) => axiosInstance.post('/api/user/updateUserDetails', data).then(response => response);
}
