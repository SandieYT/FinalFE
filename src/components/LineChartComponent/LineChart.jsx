import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';


const LineChart = ({ historicalData }) => {
  const [priceData, setPriceData] = useState([["Date","Price"]]);

  useEffect(()=>{
    let dataCopy = [["Date","Price"]]
    if (historicalData.prices) {
      historicalData.prices.map((item)=>{
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
      })
      setPriceData(dataCopy)
    }
  },[historicalData])

  return (
    <Chart
    chartType='Line'
    data={priceData}
    height="100%"/>
  );
};

export default LineChart;