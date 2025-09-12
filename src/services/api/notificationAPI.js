import api from './api';

const notificationAPI = {
  getAllNotifications: () => {
    return api.get('/notifications');
  },

  getNotificationById: (id) => {
    return api.get(`/notifications/${id}`);
  },

  markAsRead: (id) => {
    return api.put(`/notifications/${id}/read`);
  },

  markAllAsRead: () => {
    return api.put('/notifications/read-all');
  },

  deleteNotification: (id) => {
    return api.delete(`/notifications/${id}`);
  },

  getUserNotifications: (userId) => {
    return api.get(`/notifications/user/${userId}`);
  },

  getUnreadCount: (userId) => {
    return api.get(`/notifications/unread-count/${userId}`);
  },

  createNotification: (notificationData) => {
    return api.post('/notifications', notificationData);
  },
};

export default notificationAPI;
