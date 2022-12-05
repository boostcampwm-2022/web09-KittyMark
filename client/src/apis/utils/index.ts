import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SERVER, TESTSERVER } from '../config';

// SERVER 연결시 SERVER 로 변경 / 테스트시 TESTSERVER 로 변경
const BASE_URL = SERVER;

const axiosApi = (url: string, headers?: Record<string, unknown>) => {
  return axios.create({ baseURL: url, headers });
};

const defaultInstance = axiosApi(BASE_URL);
const defaultFormInstance = axiosApi(BASE_URL, {
  'Content-Type': 'multipart/form-data',
});
export { defaultInstance, defaultFormInstance };
