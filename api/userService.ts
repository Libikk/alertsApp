import axios from 'axios';

export class UserService {
  static getUserData = async () => axios.get('http://localhost:3000/api/user/getUserData').then(response => response);
}
