import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authSlice from './store/slices/authSlice';

// Mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
        role: null,
        loading: false,
        error: null,
        token: null,
        ...initialState.auth,
      },
    },
  });
};

// Test wrapper component
const TestWrapper = ({ children, store }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('App Component', () => {
  test('renders login page when not authenticated', () => {
    const store = createMockStore();
    
    render(
      <TestWrapper store={store}>
        <App />
      </TestWrapper>
    );

    // Should redirect to login since user is not authenticated
    expect(window.location.pathname).toBe('/login');
  });

  test('renders dashboard when authenticated', () => {
    const store = createMockStore({
      auth: {
        isAuthenticated: true,
        user: { id: 1, email: 'test@example.com' },
        role: 'USER',
        loading: false,
        error: null,
        token: 'mock-token',
      },
    });

    render(
      <TestWrapper store={store}>
        <App />
      </TestWrapper>
    );

    // Should redirect to dashboard since user is authenticated
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('shows loading spinner during authentication check', () => {
    const store = createMockStore({
      auth: {
        loading: true,
      },
    });

    render(
      <TestWrapper store={store}>
        <App />
      </TestWrapper>
    );

    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
