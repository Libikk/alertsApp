import axios from 'axios';
import appConfig from './appConfig';

export default axios.create({
  baseURL: appConfig.envUrl,
});
