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


function OneWeekChart({searchKey}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let BASE_URL = process.env.REACT_APP_BACKEND_URL;
        if(process.env.NODE_ENV === "production"){
          BASE_URL= process.env.REACT_APP_BACKEND_URL_PROD;
        }
        const response = await fetch(`${BASE_URL}api/stock-data/week?symbol=${searchKey}`);
        const result = await response.json();

        // Extract and format the data
        const timeSeries = result['Time Series (30min)'];
        const formattedData = Object.keys(timeSeries).map(key => ({
          date: key,
          close: parseFloat(timeSeries[key]['4. close']),
        })).reverse().slice(0, 7 * 24 * 2); // Limit to the last week (7 days, 24 hours, 2 points per hour)
        
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchKey]);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <ResponsiveContainer width="100%" height="95%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom:10 }}
      >
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
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

export default OneWeekChart;
