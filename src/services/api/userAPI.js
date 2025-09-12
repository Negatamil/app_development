import api from './api';

const userAPI = {
  getAllUsers: () => {
    return api.get('/users');
  },

  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },

  createUser: (userData) => {
    return api.post('/users', userData);
  },

  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },

  updateUserProfile: (id, profileData) => {
    return api.put(`/users/${id}/profile`, profileData);
  },

  changeUserRole: (id, role) => {
    return api.put(`/users/${id}/role`, { role });
  },

  toggleUserStatus: (id) => {
    return api.put(`/users/${id}/toggle-status`);
  },

  getUserStatistics: () => {
    return api.get('/users/statistics');
  },
};

export default userAPI;
