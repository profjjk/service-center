import { axiosInstance as api } from '../lib/axiosInstance';
import { getStoredToken } from './storage';

const getAuthHeader = () => {
    const token = getStoredToken().token;
    if (token) {
        return { 'service-center': token };
    }
}

export const API = {
    // CUSTOMERS
    getCustomers(companyId) {
        return api.get(`/customers/${companyId}`, { headers: getAuthHeader() });
    },
    createCustomer(newCustomer) {
        return api.post('/customers', newCustomer, { headers: getAuthHeader() });
    },
    updateCustomer(customerId, data) {
        return api.put(`/customers/${customerId}`, data, { headers: getAuthHeader() });
    },
    deleteCustomer(customerId) {
        return api.delete(`/customers/${customerId}`, { headers: getAuthHeader() });
    },

    // USERS
    getUser(userId) {
        return api.get(`/users/${userId}`, { headers: getAuthHeader() });
    },
    createUser(newUser) {
        return api.post('/users', newUser, { headers: getAuthHeader() });
    },
    updateUser(userId, data) {
        return api.put(`/users/${userId}`, data, { headers: getAuthHeader() });
    },
    deleteUser(userId) {
        return api.delete(`/users/${userId}`, { headers: getAuthHeader() });
    },

    // AUTHENTICATION
    login(credentials) {
        return api.post(`/auth/login`, credentials);
    },
    register(data) {
        return api.post(`/auth/register`, data);
    }
}