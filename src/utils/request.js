import axios from 'axios';

const request = axios.create({
    // baseURL: 'https://sever-mobile-shop.herokuapp.com/',
    baseURL: 'http://localhost:3000/',
});

export default request;
