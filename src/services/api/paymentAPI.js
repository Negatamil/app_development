import api from './api';

const paymentAPI = {
  getAllPayments: () => {
    return api.get('/payments');
  },

  getPaymentById: (id) => {
    return api.get(`/payments/${id}`);
  },

  createPayment: (paymentData) => {
    return api.post('/payments', paymentData);
  },

  updatePayment: (id, paymentData) => {
    return api.put(`/payments/${id}`, paymentData);
  },

  deletePayment: (id) => {
    return api.delete(`/payments/${id}`);
  },

  getBookingPayments: (bookingId) => {
    return api.get(`/payments/booking/${bookingId}`);
  },

  getUserPayments: (userId) => {
    return api.get(`/payments/user/${userId}`);
  },

  processPayment: (paymentData) => {
    return api.post('/payments/process', paymentData);
  },

  refundPayment: (id, refundAmount) => {
    return api.post(`/payments/${id}/refund`, { refundAmount });
  },

  getPaymentHistory: (userId) => {
    return api.get(`/payments/history/${userId}`);
  },
};

export default paymentAPI;
