// src/redux/stockSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import polygonAPI from '../api/polygon'; // Ensure this path matches where you've set up your Axios instance

export const fetchTickerDetails = createAsyncThunk(
  'stock/fetchTickerDetails',
  async (ticker, { rejectWithValue }) => {
    try {
      const response = await polygonAPI.get(`/v3/reference/tickers/${ticker}`);
      // Check if the response has data and is successful
      if (response.data && response.data.status === 'OK' && response.data.results) {
        return response.data.results;
      } else {
        // Handle cases where the ticker is not found or another issue occurs
        return rejectWithValue('Ticker not found or invalid response');
      }
    } catch (error) {
      // Handle network or server errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Problem with response", error.response.data);
        return rejectWithValue(error.response.data.message || 'Error fetching ticker details');
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received", error.request);
        return rejectWithValue('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchHistoricalData = createAsyncThunk(
    'stock/fetchHistoricalData',
    async ({ ticker, from, to }, { rejectWithValue }) => {
      try {
        const response = await polygonAPI.get(`/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`);
        // Check if 'results' exists and is an array
        if (response.data && Array.isArray(response.data.results)) {
          return {
            ticker,
            history: response.data.results,
          };
        } else {
          return rejectWithValue('No historical data found or invalid format');
        }
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    }
  );
  

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    details: null, // For storing ticker details
    history: [], // For storing historical data
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null, // For storing the error message
  },
  reducers: {
    // You can add reducers for other actions here
  },
  extraReducers: (builder) => {
    builder
      // Handle states for fetching ticker details
      .addCase(fetchTickerDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchTickerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch ticker details';
      })
      // Handle states for fetching historical data
      .addCase(fetchHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload.history;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch historical data';
      });
  },
});

export default stockSlice.reducer;
