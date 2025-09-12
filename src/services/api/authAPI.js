import api from './api';

const authAPI = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (email, password, role = 'USER') => {
    return api.post('/auth/register', { email, password, role });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  changePassword: (currentPassword, newPassword) => {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },
};

export default authAPI;
