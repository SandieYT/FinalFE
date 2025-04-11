import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./markets.css";

export default function Markets() {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(
          "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
        );

        setTotal(Math.ceil(response2.data.length / 20));
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 20,
              page: page,
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko API:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div id="main-markets">
      <div className="market-container">
        <h1 className="market-header">Crypto Hub</h1>
        <ul className="market-currencies">
          <li className="market-currency-header">
            <p className="currency-icon" />
            <h2 className="currency-name-header">Coin Name</h2>
            <h2 className="currency-price">Price</h2>
            <h2 className="currency-cap">Market Cap</h2>
            <h2 className="currency-percentage">24h Change</h2>
          </li>
          {cryptoData.map((coin) => (
            <Link key={coin.id} to={"/coin/" + coin.id}>
              <li className="market-currency">
                <img className="currency-icon" src={coin.image} />
                <p className="currency-name">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </p>
                <p className="currency-price">${coin.current_price}</p>
                <p className="currency-cap">
                  ${formatter.format(coin.market_cap)}
                </p>
                <p
                  className={
                    (coin.price_change_percentage_24h > 0
                      ? "percentage-increase"
                      : coin.price_change_percentage_24h < 0
                      ? "percentage-decrease"
                      : "percentage-neutral") + " currency-percentage"
                  }
                >
                  {coin.price_change_percentage_24h}%
                </p>
              </li>
            </Link>
          ))}
          <div className="pagination-buttons">
            <button
              className="pagination-button prev"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              {"<"}
            </button>
            {page > 3 && (
              <button
                className="pagination-button"
                onClick={() => setPage(page - 3)}
              >
                {page - 3}
              </button>
            )}
            {page > 2 && (
              <button
                className="pagination-button"
                onClick={() => setPage(page - 2)}
              >
                {page - 2}
              </button>
            )}
            {page > 1 && (
              <button
                className="pagination-button"
                onClick={() => setPage(page - 1)}
              >
                {page - 1}
              </button>
            )}
            <button className="pagination-button current" disabled>
              {page}
            </button>
            {page < total && (
              <button
                className="pagination-button"
                onClick={() => setPage(page + 1)}
              >
                {page + 1}
              </button>
            )}
            {page < total - 1 && (
              <button
                className="pagination-button"
                onClick={() => setPage(page + 2)}
              >
                {page + 2}
              </button>
            )}
            {page < total - 2 && (
              <button
                className="pagination-button"
                onClick={() => setPage(page + 3)}
              >
                {page + 3}
              </button>
            )}
            <button
              className="pagination-button next"
              disabled={page === total}
              onClick={() => setPage(page + 1)}
            >
              {">"}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
