import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns'; // Ensure date-fns is still imported
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StockHistoryChart() {
  const history = useSelector((state) => state.stock.history);

  if (history.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No historical data available.
      </div>
    );
  }

  // Transform history data as needed for the chart
  const data = history.map(item => {
    // Create a new Date object from the timestamp
    const date = new Date(item.t);
    // Add one day to the date to correct the off-by-one error
    date.setDate(date.getDate() + 1);
    return {
      date: format(date, 'MM/dd/yyyy'), // Format the adjusted date
      close: item.c,
    };
  });

  return (
    <div className="card">
      <h5 className="card-header">Stock History Chart</h5>
      <div className="card-body">
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StockHistoryChart;
