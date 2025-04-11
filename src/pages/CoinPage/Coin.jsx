import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Graph } from "../../components";
import "./coin.css";

export default function Coin() {
  const [cryptoData, setCryptoData] = useState([]);
  const [coinDetails, setCoinDetails] = useState(null);
  const { id } = useParams();

  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const coinDetailsUrl = `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`;
        const ohlcUrl = `${coinDetailsUrl}/ohlc`;

        const [coinDetailsResponse, ohlcResponse] = await Promise.all([
          axios.get(coinDetailsUrl),
          axios.get(ohlcUrl, {
            params: {
              vs_currency: "usd",
              days: 1,
            },
          }),
        ]);

        setCoinDetails(coinDetailsResponse.data);
        setCryptoData(ohlcResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchCoinData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coinDetailsResponse, ohlcResponse] = await Promise.all([
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`
          ),
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/ohlc`,
            {
              params: {
                vs_currency: "usd",
                days: 1,
              },
            }
          ),
        ]);

        setCoinDetails(coinDetailsResponse.data);
        setCryptoData(ohlcResponse.data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko API:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div id="main-coin">
      <div className="coin-container">
        <div className="coin-info-section">
          <div className="coin-info-content">
            <div className="coin-header-section">
              <img
                className="coin-icon"
                src={coinDetails ? coinDetails.image.large : null}
                alt={`${coinDetails?.name || "Crypto"} icon`}
              />
              <h1 className="coin-name">
                {coinDetails ? coinDetails.name : ""}
              </h1>
              {coinDetails && (
                <span className="coin-symbol">
                  ({coinDetails.symbol.toUpperCase()})
                </span>
              )}
            </div>
            <div className="coin-categories">
              {(coinDetails ? coinDetails.categories : []).map(
                (category, index) => (
                  <span key={index} className="coin-category-tag">
                    {category}
                  </span>
                )
              )}
            </div>
            {coinDetails && (
              <p className="coin-description">{coinDetails.description.en}</p>
            )}
          </div>
        </div>
        <div className="coin-stats-section">
          <div className="coin-graph-container">
            {coinDetails && <Graph historicalData={cryptoData} />}
          </div>
          <div className="coin-stats-container">
            <div className="coin-stat-item">
              <span className="coin-stat-label">Price</span>
              <span className="coin-stat-value">
                ${coinDetails?.market_data?.current_price?.usd}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
