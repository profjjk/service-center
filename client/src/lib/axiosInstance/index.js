import axios from 'axios';

let baseUrl;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    baseUrl = 'http://localhost:8080/api';
} else {
    baseUrl = 'https://service-center-166ef71039d6.herokuapp.com/api/';
}

const config = { baseURL: baseUrl };

export const axiosInstance = axios.create(config);