import axios from 'axios';

export default class AuthService {
  static register = async (data) => axios.post('http://localhost:3000/api/auth/register', data).then(({ data }) => data);

  static login = async ({ email, password }) => axios.post('http://localhost:3000/api/auth/login', { email, password }).then(({ data }) => data);

  static authorize = async (token) => axios.post('http://localhost:3000/api/auth/authorize', { token }).then(({ data }) => data);
}
