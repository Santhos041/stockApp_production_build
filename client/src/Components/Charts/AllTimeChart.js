import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function AllTimeChart({ searchKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let BASE_URL = process.env.REACT_APP_BACKEND_URL;
       if(process.env.NODE_ENV === "production"){
        BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
       }
        const response = await fetch(`${BASE_URL}api/stock-data/alltime?symbol=${searchKey}`);
        const result = await response.json();
        

        const timeSeries = result['Monthly Time Series'];
        const formattedData = Object.keys(timeSeries).map(key => ({
          date: key,
          year: key.split('-')[0],
          open: parseFloat(timeSeries[key]['1. open']),
          high: parseFloat(timeSeries[key]['2. high']),
          low: parseFloat(timeSeries[key]['3. low']),
          close: parseFloat(timeSeries[key]['4. close']),
          volume: parseInt(timeSeries[key]['5. volume'], 10)
        })).reverse();

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchKey]);

  const formatXAxis = (tickItem) => {
    return tickItem.split('-')[0];
  };

  return (
    <ResponsiveContainer width="100%" height="95%">
      <AreaChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#108554"
          fill="#108554"
          fillOpacity={0.5}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AllTimeChart;
