import axios from 'axios';

let baseUrl = 'https://service-center-server-c06036aa6434.herokuapp.com/';

const config = { baseURL: baseUrl };

export const axiosInstance = axios.create(config);