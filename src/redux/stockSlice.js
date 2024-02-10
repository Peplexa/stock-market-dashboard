import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Lambda function URL for fetching ticker details
const LAMBDA_TICKER_DETAILS_URL = 'https://ulmaozke74ka45pmyvmqfgu6tq0bthmm.lambda-url.us-west-2.on.aws/';

// Lambda function URL for fetching historical data
const LAMBDA_HISTORICAL_DATA_URL = 'https://f6gc6gjp753q3uvorhfs63v6mi0gdqea.lambda-url.us-west-2.on.aws/';

export const fetchTickerDetails = createAsyncThunk(
  'stock/fetchTickerDetails',
  async (ticker, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LAMBDA_TICKER_DETAILS_URL}?ticker=${ticker}`);
      const data = await response.json();
      if (data && response.ok) {
        return data;
      } else {
        return rejectWithValue('Ticker not found or invalid response from Lambda function');
      }
    } catch (error) {
      console.error("Error fetching ticker details from Lambda:", error);
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
    'stock/fetchHistoricalData',
    async (ticker, { rejectWithValue }) => {
      try {
        
        const response = await fetch(`${LAMBDA_HISTORICAL_DATA_URL}?ticker=${ticker}`);
        const data = await response.json();
        if (response.ok && data && data.results) {
          // Directly return the results array which contains the historical data
          return {
            ticker: data.ticker,
            history: data.results,
          };
        } else {
          return rejectWithValue('Failed to fetch historical data or invalid format from Lambda function');
        }
      } catch (error) {
        console.error("Error fetching historical data from Lambda:", error);
        return rejectWithValue(error.toString());
      }
    }
  );
  

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    details: null,
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickerDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
        state.error = null;
      })
      .addCase(fetchTickerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch ticker details';
      })
      .addCase(fetchHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload.history;
        state.error = null;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch historical data';
      });
  },
});

export default stockSlice.reducer;
