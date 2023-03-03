import axios from 'axios';

let baseUrl = 'http://localhost:8080/api';

const config = { baseURL: baseUrl };

export const axiosInstance = axios.create(config);