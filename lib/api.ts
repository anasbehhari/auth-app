import axios from 'axios';
import { BASE_URL } from './constants';
const baseURL = BASE_URL;
export const api = axios.create({
  baseURL,
  withCredentials: true,
});
