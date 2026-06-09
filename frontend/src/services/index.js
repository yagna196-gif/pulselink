import apiClient from './api';

export const authService = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export const donorService = {
  registerDonor: async (donorData) => {
    const response = await apiClient.post('/donors', donorData);
    return response.data;
  },

  getDonors: async (params) => {
    const response = await apiClient.get('/donors', { params });
    return response.data;
  },

  getDonorById: async (id) => {
    const response = await apiClient.get(`/donors/${id}`);
    return response.data;
  },

  updateDonor: async (id, data) => {
    const response = await apiClient.put(`/donors/${id}`, data);
    return response.data;
  },
};

export const requestService = {
  createRequest: async (requestData) => {
    const response = await apiClient.post('/requests', requestData);
    return response.data;
  },

  getRequests: async (params) => {
    const response = await apiClient.get('/requests', { params });
    return response.data;
  },

  getRequestById: async (id) => {
    const response = await apiClient.get(`/requests/${id}`);
    return response.data;
  },

  respondToRequest: async (requestId, status, reason) => {
    const response = await apiClient.post(`/requests/${requestId}/respond`, {
      status,
      reason,
    });
    return response.data;
  },

  updateRequestStatus: async (id, status) => {
    const response = await apiClient.put(`/requests/${id}/status`, { status });
    return response.data;
  },
};
