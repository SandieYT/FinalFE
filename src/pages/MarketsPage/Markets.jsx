import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Footer } from "../../components";
import "./markets.css";

export default function Markets() {
  const [cryptoData, setCryptoData] = useState([]);
  const formatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 3,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,ripple',
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data from CoinGecko API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="main-markets">
      <section>
              <ul>
        {cryptoData.map(coin => (
          <li key={coin.id}>
            <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
            <p>Price: ${coin.current_price}</p>
            <p>Market Cap: ${formatter.format(coin.market_cap)}</p>
            <p>24h Change: {coin.price_change_percentage_24h}%</p>
          </li>
        ))}
      </ul>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
