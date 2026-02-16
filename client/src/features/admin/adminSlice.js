import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const fetchAllSellers = createAsyncThunk(
  'admin/fetchSellers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/sellers');
      return data.sellers;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch sellers');
    }
  }
);

export const approveSeller = createAsyncThunk(
  'admin/approveSeller',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/admin/sellers/${id}/approve`);
      return data.seller;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to approve seller');
    }
  }
);

export const rejectSeller = createAsyncThunk(
  'admin/rejectSeller',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/admin/sellers/${id}/reject`);
      return data.seller;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reject seller');
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/users');
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin/users/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/orders');
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/analytics');
      return data.analytics;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    sellers: [],
    users: [],
    orders: [],
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveSeller.fulfilled, (state, action) => {
        const idx = state.sellers.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) state.sellers[idx] = { ...state.sellers[idx], isApproved: true };
      })
      .addCase(rejectSeller.fulfilled, (state, action) => {
        const idx = state.sellers.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) state.sellers[idx] = { ...state.sellers[idx], isApproved: false };
      })
      .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalytics.pending, (state) => { state.loading = true; })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
