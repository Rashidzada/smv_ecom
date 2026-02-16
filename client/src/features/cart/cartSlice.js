import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/cart');
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/cart', { productId, quantity });
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/cart/${productId}`, { quantity });
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.delete('/cart');
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    const handleCartResult = (state, action) => {
      state.loading = false;
      state.items = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    };

    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, handleCartResult)
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => { state.loading = true; })
      .addCase(addToCart.fulfilled, handleCartResult)
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, handleCartResult)
      .addCase(removeFromCart.fulfilled, handleCartResult)
      .addCase(clearCart.fulfilled, handleCartResult);
  },
});

export const { clearCartState, clearError } = cartSlice.actions;
export default cartSlice.reducer;
