import React, { useEffect,useState } from 'react';
import './StockDetails.css';
function StockDetails({searchKey}){
  console.log("Symbol received in StockDetails:", {searchKey});
  const [stockData,setStockData]=useState(null);
  useEffect(()=>{
    const fetchStockData=async()=>{
      try{
        let BASE_URL = process.env.REACT_APP_BACKEND_URL;
       if(process.env.NODE_ENV === "production"){
        BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
       }
        const response = await fetch(`${BASE_URL}api/stock-data/basics?symbol=${searchKey}`);
        const result=await response.json();
        setStockData(result['Global Quote']);
        console.log("Stock Details fetched");
        
console.log(result); 
        
      }
      catch(error){
        console.error('Error fetching stock data:',error);
      }
    };
    fetchStockData();
  },[searchKey]);
    return(
         <div className='stock-details-container'>
      <h2><b>Stock Details</b></h2>
     
        
        <div className='form-container'>
          <div className="form-group">
            <div className="box"><b>Symbol:</b> {stockData?stockData['01. symbol']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Price:</b> {stockData?stockData['05. price']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Open:</b> {stockData?stockData['02. open']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Prev. Close:</b> {stockData?stockData['08. previous close']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Today's High:</b> {stockData?stockData['03. high']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Today's Low:</b> {stockData?stockData['04. low']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Volume:</b> {stockData?stockData['06. volume']:"No data found"}</div>
          </div>
          <div className="form-group">
            <div className="box"><b>Change %:</b> {stockData?stockData['10. change percent']:"No data found"}</div>
          </div>
        </div>
      
    </div>
    )
}
export default StockDetails;