import axios from 'axios';

let baseUrl = 'http://localhost:3000/';

const userUrl = `${baseUrl}/users`;
const authUrl = `${baseUrl}/auth`;

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