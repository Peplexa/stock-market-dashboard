import React from 'react';

const DateRangeSelector = ({ onRangeSelect }) => {
  return (
    <div className="btn-group" role="group" aria-label="Date range selector">
      <button type="button" className="btn btn-outline-primary" onClick={() => onRangeSelect(1, 'month')}>1 Month</button>
      <button type="button" className="btn btn-outline-primary" onClick={() => onRangeSelect(6, 'months')}>6 Months</button>
      <button type="button" className="btn btn-outline-primary" onClick={() => onRangeSelect(1, 'year')}>1 Year</button>
      <button type="button" className="btn btn-outline-primary" onClick={() => onRangeSelect(2, 'years')}>2 Years</button>
    </div>
  );
};

export default DateRangeSelector;
