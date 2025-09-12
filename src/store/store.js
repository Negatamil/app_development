import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import bookingSlice from './slices/bookingSlice';
import slotSlice from './slices/slotSlice';
import notificationSlice from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bookings: bookingSlice,
    slots: slotSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
