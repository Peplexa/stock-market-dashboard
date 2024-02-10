// src/App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import StockSearchForm from './components/StockSearchForm';
import StockDetails from './components/StockDetails';
import StockHistoryChart from './components/StockHistoryChart';

function App() {
  return (
    <div className="App container mt-5"> {/* Use Bootstrap's container class for alignment and spacing */}
      <h1 className="text-center mb-4">Stock Market Dashboard and Financial Jokes</h1>
      <StockSearchForm />
      <div className="my-4">
        <StockDetails />
      </div>
      <div className="mt-4">
        <StockHistoryChart />
      </div>
    </div>
  );
}

export default App;
