import axios from 'axios';
import appConfig from './appConfig';
const getConfig = require('next/config').default;

const { publicRuntimeConfig = {} } = getConfig ? getConfig() || {} : {};
console.log('appConfig: ', appConfig, publicRuntimeConfig);

export default axios.create({
  baseURL: appConfig.envUrl,
});
