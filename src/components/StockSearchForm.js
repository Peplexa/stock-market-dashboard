import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTickerDetails, fetchHistoricalData } from '../redux/stockSlice';

function StockSearchForm() {
  const [ticker, setTicker] = useState('');
  const [joke, setJoke] = useState(''); // State for holding the joke
  const dispatch = useDispatch();

  const fetchJoke = async () => {
    try {
      // Updated URL
      const response = await fetch('https://swuaz57u4mghtceiqkzq7bf2kq0afqpi.lambda-url.us-west-2.on.aws/');
      const data = await response.json();
      if (data.joke) {
        setJoke(data.joke); // Update the joke state with the received joke
      } else {
        // Handle cases where the expected joke data might not be present
        setJoke("Got a response, but it didn't include a joke.");
      }
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setJoke('Failed to load a joke, please try again later.'); // Fallback message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ticker) {
      // Dispatch the actions to fetch ticker details and historical data
      dispatch(fetchTickerDetails(ticker));
      
      const toDate = new Date();
      const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() - 30);
      const formatDateString = (date) => date.toISOString().split('T')[0];

// In StockSearchForm, when dispatching fetchHistoricalData
    dispatch(fetchHistoricalData(ticker));
      await fetchJoke(); // Fetch a joke whenever a search occurs
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group mb-3">
        <input
          type="text"
          id="stockTicker" // Unique ID for the input field
          name="ticker" // Name attribute for form submission
          className="form-control"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())} // Convert ticker to uppercase
          placeholder="Enter stock ticker, e.g., AAPL"
          autoComplete="off" // Optional: Manage autofill behavior. Adjust as needed.
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>
      {joke && <div className="alert alert-info mt-3">{joke}</div>} {/* Display the joke */}
    </form>
  );
  
}

export default StockSearchForm;
