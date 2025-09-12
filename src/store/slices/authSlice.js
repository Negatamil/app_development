import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../services/api/authAPI';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // For demo purposes, simulate a successful login
      // In production, this would call the actual API
      const mockUser = {
        id: 1,
        email: email,
        role: email.includes('admin') ? 'ADMIN' : 
              email.includes('manager') ? 'MANAGER' : 
              email.includes('security') ? 'SECURITY' : 'USER'
      };
      
      const mockToken = 'demo-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { token: mockToken, user: mockUser };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, role = 'USER' }, { rejectWithValue }) => {
    try {
      // For demo purposes, simulate a successful registration
      // In production, this would call the actual API
      return { message: 'Registration successful' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        return {
          token,
          user: JSON.parse(user),
          isAuthenticated: true
        };
      }
      
      return {
        token: null,
        user: null,
        isAuthenticated: false
      };
    } catch (error) {
      return rejectWithValue('Auth check failed');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.role = null;
        state.error = null;
      })
      
      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.role = action.payload.user?.role || null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
