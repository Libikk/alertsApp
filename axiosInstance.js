import axios from 'axios';
import { envUrl } from './appConfig';

export default axios.create({
  baseURL: envUrl,
});
