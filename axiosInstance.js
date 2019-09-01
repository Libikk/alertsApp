import axios from 'axios';
import { envUrl, port } from './appConfig';

export default axios.create({
  baseURL: `${envUrl}:${port}`,
});
