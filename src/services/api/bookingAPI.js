import api from './api';

const bookingAPI = {
  getAllBookings: () => {
    return api.get('/bookings');
  },

  getBookingById: (id) => {
    return api.get(`/bookings/${id}`);
  },

  createBooking: (bookingData) => {
    return api.post('/bookings', bookingData);
  },

  updateBooking: (id, bookingData) => {
    return api.put(`/bookings/${id}`, bookingData);
  },

  deleteBooking: (id) => {
    return api.delete(`/bookings/${id}`);
  },

  getUserBookings: (userId) => {
    return api.get(`/bookings/user/${userId}`);
  },

  getSlotBookings: (slotId) => {
    return api.get(`/bookings/slot/${slotId}`);
  },

  cancelBooking: (id) => {
    return api.put(`/bookings/${id}/cancel`);
  },

  extendBooking: (id, extendedTime) => {
    return api.put(`/bookings/${id}/extend`, { extendedTime });
  },

  checkIn: (id) => {
    return api.put(`/bookings/${id}/checkin`);
  },

  checkOut: (id) => {
    return api.put(`/bookings/${id}/checkout`);
  },

  getBookingHistory: (userId) => {
    return api.get(`/booking-history/user/${userId}`);
  },
};

export default bookingAPI;
