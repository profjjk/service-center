import { axiosInstance as api } from '../lib/axiosInstance';
import { getStoredToken } from './storage';

const getAuthHeader = () => {
    const token = getStoredToken().token;
    if (token) {
        return { 'service-center': token };
    }
}

export const API = {
    // JOBS
    createJob(newJob) {
        return api.post('/jobs', newJob, { headers: getAuthHeader() })
    },
    getJobs(companyId) {
        return api.get(`/jobs/${companyId}`, { headers: getAuthHeader() })
    },
    updateJob(jobId, data) {
        return api.put(`/jobs/${jobId}`, data, { headers: getAuthHeader() })
    },
    deleteJob(jobId) {
        return api.delete(`/jobs/${jobId}`, { headers: getAuthHeader() })
    },
    deleteJobsByCustomer(customerId) {
        return api.delete(`jobs/many/${customerId}`, { headers: getAuthHeader() })
    },

    // CUSTOMERS
    createCustomer(newCustomer) {
        return api.post('/customers', newCustomer, { headers: getAuthHeader() });
    },
    getCustomers(companyId) {
        return api.get(`/customers/${companyId}`, { headers: getAuthHeader() });
    },
    updateCustomer(customerId, data) {
        return api.put(`/customers/${customerId}`, data, { headers: getAuthHeader() });
    },
    deleteCustomer(customerId) {
        return api.delete(`/customers/${customerId}`, { headers: getAuthHeader() });
    },
    deleteCustomersByCompany(companyId) {
        return api.delete(`/customers/many/${companyId}`, { headers: getAuthHeader() });
    },

    // PARTS
    createPart(newPart) {
        return api.post('/parts', newPart, { headers: getAuthHeader() });
    },
    getParts(companyId) {
        return api.get(`/parts/${companyId}`, { headers: getAuthHeader() });
    },
    updatePart(partId, data) {
        return api.put(`/parts/${partId}`, data, { headers: getAuthHeader() });
    },
    deletePart(partId) {
        return api.delete(`/parts/${partId}`, { headers: getAuthHeader() });
    },

    // USERS
    createUser(newUser) {
        return api.post('/users', newUser, { headers: getAuthHeader() });
    },
    getUser(userId) {
        return api.get(`/users/${userId}`, { headers: getAuthHeader() });
    },
    updateUser(userId, data) {
        return api.put(`/users/${userId}`, data, { headers: getAuthHeader() });
    },
    deleteUser(userId) {
        return api.delete(`/users/${userId}`, { headers: getAuthHeader() });
    },

    // AUTHENTICATION
    register(data) {
        return api.post(`/auth/register`, data);
    },
    login(credentials) {
        return api.post(`/auth/login`, credentials);
    }
}