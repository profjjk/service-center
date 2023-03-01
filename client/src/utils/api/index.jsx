import axios from 'axios';
import { getStoredToken } from '../storage';

let baseUrl = 'http://localhost:8080/api';

const userUrl = `${baseUrl}/users`;
const authUrl = `${baseUrl}/auth`;

const authHeader = () => {
    const token = getStoredToken().token;
    if (token) {
        return { 'service-center': token };
    }
}

export const API = {
    // USERS
    getUser(id) {
        return axios.get(`${userUrl}/${id}`);
    },
    updateUser(id, data) {
        return axios.put(`${userUrl}/${id}`, data);
    },
    deleteUser(id) {
        return axios.delete(`${userUrl}/${id}`);
    },

    // AUTHENTICATION
    login(data) {
        return axios.post(`${authUrl}/login`, data);
    },
    register(data) {
        return axios.post(`${authUrl}/register`, data);
    }
}