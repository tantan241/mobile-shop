import axios from 'axios';
import { URL } from './urlConfig';

const request = axios.create({
    // baseURL: 'https://sever-mobile-shop.herokuapp.com/',
    baseURL: 'http://localhost:3000/',
});
export const requestPy = axios.create({
    // baseURL: 'https://sever-mobile-shop.herokuapp.com/',
    baseURL: URL,
});

export default request;
