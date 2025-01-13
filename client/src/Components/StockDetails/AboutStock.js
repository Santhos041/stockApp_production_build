import React, { useState, useEffect } from 'react';
import './AboutStock.css';



function AboutStock({ searchKey }) {
  console.log("Symbol received in AboutStock:", { searchKey });
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    if (searchKey) {
      const fetchOverview = async () => {
        try {
          let BASE_URL = process.env.REACT_APP_BACKEND_URL;
       if(process.env.NODE_ENV === "production"){
        BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
       }
          const response = await fetch(`${BASE_URL}api/stock-data/overview?symbol=${searchKey}`);
          const result = await response.json();
          setOverview(result);
        } catch (error) {
          console.log('Error fetching overview', error);
        }
      };
      fetchOverview();
    }
  }, [searchKey]);

  return (
    <div className="about_section">
      <h1>Overview</h1>
      <div className="about_container">
        <div className="label">
          <b>Symbol:</b>
          <p>{overview ? overview['Symbol'] || 'N/A' : 'Loading...'}</p>
        </div>
        <div className="label">
          <b>Name:</b>
          <p>{overview ? overview['Name'] || 'N/A' : 'Loading...'}</p>
        </div>
        <div className="label">
          <b>Asset Type:</b>
          <p>{overview ? overview['AssetType'] || 'N/A' : 'Loading...'}</p>
        </div>
        <div className="label">
          <b>Description:</b>
          <p>{overview ? overview['Description'] || 'N/A' : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutStock;
