import React,{useState,useEffect} from 'react'

const Analytics = ({searchKey}) => {
  const[analyst,setAnalyst]=useState({})
  useEffect(()=>{
    const AnalystData=async()=>{
      try{

        let BASE_URL = process.env.REACT_APP_BACKEND_URL;
       if(process.env.NODE_ENV === "production"){
        BASE_URL=process.env.REACT_APP_BACKEND_URL_PROD;
       }
        const response = await fetch(`${BASE_URL}api/stock-data/analytics?symbol=${searchKey}`);
        const result=await response.json()
        setAnalyst(result)
      }
      catch(error){
        console.error(error)
      }
    };
    AnalystData();
  },[searchKey])
  return (
    <div className='stock-details-container'>
      <h2><b>Analyst Rating</b></h2>
        <div className='form-container'>
        <div className="form-group">
          <div className='box'>
            <b>Strong Buy:{analyst['AnalystRatingStrongBuy']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>Buy:{analyst['AnalystRatingBuy']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>Hold:{analyst['AnalystRatingHold']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>Sell:{analyst['AnalystRatingSell']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>Strong Sell:{analyst['AnalystRatingStrongSell']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>Analyst Target Price:{analyst['AnalystTargetPrice']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>52-Weeks High:{analyst['52WeekHigh']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>52-Weeks Low:{analyst['52WeekLow']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>50 Day M.A:{analyst['50DayMovingAverage']}</b>
          </div>
        </div>
        <div className="form-group">
          <div className='box'>
            <b>200 Day M.A:{analyst['200DayMovingAverage']}</b>
          </div>
        </div>
     
        
        </div>
    </div>
  )
}

export default Analytics