import axiosInstance from '../axiosInstance';

export class UserService {
  static updateUserDetails = async (data) => axiosInstance.post('/api/user/updateUserDetails', data).then(response => response);
}
