import axios from 'axios';

export default class AuthService {
  static register = async (data) => axios.post('http://localhost:3000/api/auth/register', data).then(response => response);

  static login = async () => axios.post('http://localhost:3000/api/auth/login').then(response => response);
}
