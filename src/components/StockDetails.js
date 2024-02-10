import React from 'react';
import { useSelector } from 'react-redux';

function StockDetails() {
  const { details, error, status } = useSelector((state) => state.stock);

  if (status === 'loading') return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!details) return <div className="alert alert-warning">No data available. Please search for a stock ticker.</div>;

  // Update to display exchange and description
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{details.name} ({details.ticker})</h5>
        <p className="card-text"><strong>Exchange:</strong> {details.exchange}</p>
        <p className="card-text"><strong>Description:</strong> {details.description}</p>
      </div>
    </div>
  );
}

export default StockDetails;
