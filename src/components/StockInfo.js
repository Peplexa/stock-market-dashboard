// src/components/StockInfo.js

import React from 'react';
import { useSelector } from 'react-redux';

function StockInfo() {
  const stock = useSelector((state) => state.stock.data);

  return (
    <div>
      {stock ? (
        <>
          <h2>{stock.symbol}</h2>
          <p>{`Price: $${stock.price}`}</p>
          {/* Add more stock information here */}
        </>
      ) : (
        <p>No stock data</p>
      )}
    </div>
  );
}

export default StockInfo;
