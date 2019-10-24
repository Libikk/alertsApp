import axiosInstance from '../axiosInstance';

export default class AuthService {
  static register = async (data) => axiosInstance.post('/api/auth/register', data).then(({ data }) => data);

  static login = async ({ email, password }) => axiosInstance.post('/api/auth/login', { email, password }).then(({ data }) => data);

  static authorize = async (token) => axiosInstance.post('/api/auth/authorize', { token }).then(({ data }) => data);

  static reSendActivationToken = async () => axiosInstance.post('/api/auth/reSendActivationToken').then(({ data }) => data);
}
