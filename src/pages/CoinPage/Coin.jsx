import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { Footer } from "../../components";
import "./coin.css";
import CryptoGraph from '../../components/GraphComponent/Graph';

export default function Coin() {
  const [cryptoData, setCryptoData] = useState([]);
  const [coinDetails, setCoinDetails] = useState(null);
  const { id } = useParams();
  
  const formatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 3,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coinDetailsResponse, ohlcResponse] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/ohlc`, {
            params: {
              vs_currency: 'usd',
              days: 1,
            },
          }),
        ]);
  

        setCoinDetails(coinDetailsResponse.data);
        setCryptoData(ohlcResponse.data);
      } catch (error) {
        console.error('Error fetching data from CoinGecko API:', error);
      }
    };
  
    fetchData();
  }, [id]);
  
        console.log(cryptoData);
        console.log(coinDetails);
  

  return (
    <div id="main-coin">
      <section className='coin-section'>
        <div className='coin-info'>
          <div className='coin-info-content'>
            <div className='coin-title'>
              <img className='coin-icon unselectable' src={coinDetails?coinDetails.image.large:""}/>
              <h1 className='coin-header'>{coinDetails?coinDetails.name:""}</h1>
              {coinDetails?<p className='coin-header-symbol'>({coinDetails.symbol.toUpperCase()})</p>:<></>}
            </div>
            <div className='coin-tags'>
              {(coinDetails?coinDetails.categories:[]).map((i,v) => (
                <p key={v} className='coin-tag'>{i}</p>
              ))}
            </div>
            {coinDetails?<p className='coin-description'>{coinDetails.description.en}</p>:<></>}
          </div>
        </div>
        <div className='coin-statistics'>
          <div className='coin-chart'>
            {coinDetails?<CryptoGraph historicalData={cryptoData}/>:<></>}
          </div>
          <div className='coin-stats'>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
