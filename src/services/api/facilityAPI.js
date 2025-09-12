import api from './api';

const facilityAPI = {
  getAllFacilities: () => {
    return api.get('/facilities');
  },

  getFacilityById: (id) => {
    return api.get(`/facilities/${id}`);
  },

  createFacility: (facilityData) => {
    return api.post('/facilities', facilityData);
  },

  updateFacility: (id, facilityData) => {
    return api.put(`/facilities/${id}`, facilityData);
  },

  deleteFacility: (id) => {
    return api.delete(`/facilities/${id}`);
  },

  getFacilityAnalytics: (id) => {
    return api.get(`/facilities/${id}/analytics`);
  },

  getFacilitySlots: (id) => {
    return api.get(`/facilities/${id}/slots`);
  },

  getFacilityBookings: (id) => {
    return api.get(`/facilities/${id}/bookings`);
  },

  updateFacilitySettings: (id, settings) => {
    return api.put(`/facilities/${id}/settings`, settings);
  },

  getFacilityRevenue: (id, period) => {
    return api.get(`/facilities/${id}/revenue`, { params: { period } });
  },

  getFacilityUtilization: (id, period) => {
    return api.get(`/facilities/${id}/utilization`, { params: { period } });
  },
};

export default facilityAPI;
