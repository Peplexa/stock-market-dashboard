// src/components/SearchBar.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchStockData } from '../redux/stockSlice';

function SearchBar() {
  const [ticker, setTicker] = React.useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker) {
      dispatch(fetchStockData(ticker));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
