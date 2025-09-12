import api from './api';

const slotAPI = {
  getAllSlots: () => {
    return api.get('/slots');
  },

  getSlotById: (id) => {
    return api.get(`/slots/${id}`);
  },

  createSlot: (slotData) => {
    return api.post('/slots', slotData);
  },

  updateSlot: (id, slotData) => {
    return api.put(`/slots/${id}`, slotData);
  },

  deleteSlot: (id) => {
    return api.delete(`/slots/${id}`);
  },

  getSlotsByFacility: (facilityId) => {
    return api.get(`/slots/facility/${facilityId}`);
  },

  getAvailableSlots: (facilityId) => {
    return api.get(`/slots/available/${facilityId}`);
  },

  updateSlotAvailability: (id, isAvailable) => {
    return api.put(`/slots/${id}/availability`, { isAvailable });
  },

  getSlotsByType: (slotType) => {
    return api.get(`/slots/type/${slotType}`);
  },

  updateSlotPricing: (id, hourlyRate) => {
    return api.put(`/slots/${id}/pricing`, { hourlyRate });
  },
};

export default slotAPI;
