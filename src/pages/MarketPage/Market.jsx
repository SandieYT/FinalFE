import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./market.css";

export default function Market() {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

        setTotalPages(50); // 1000 coins / 20 items per page = 50 pages
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 2;
    let startPage, endPage;

    if (totalPages <= maxVisibleButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxButtonsBeforeCurrent = Math.floor(maxVisibleButtons / 2);
      const maxButtonsAfterCurrent = Math.ceil(maxVisibleButtons / 2) - 1;

      if (page <= maxButtonsBeforeCurrent) {
        startPage = 1;
        endPage = maxVisibleButtons;
      } else if (page + maxButtonsAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisibleButtons + 1;
        endPage = totalPages;
      } else {
        startPage = page - maxButtonsBeforeCurrent;
        endPage = page + maxButtonsAfterCurrent;
      }
    }

    buttons.push(
      <button
        key="prev"
        className={`pagination-button prev ${page === 1 ? "disabled" : ""}`}
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        &lt;
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`pagination-button ${page === 1 ? "current" : ""}`}
          onClick={() => setPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${page === i ? "current" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={`pagination-button ${
            page === totalPages ? "current" : ""
          }`}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`pagination-button next ${
          page === totalPages ? "disabled" : ""
        }`}
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <div id="main-market">
      <div className="market-container">
        <h1 className="market-header">Crypto Hub</h1>
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="market-currencies">
            <div className="market-currency-header">
              <div className="currency-icon" />
              <h2 className="currency-name-header">Coin Name</h2>
              <h2 className="currency-price">Price</h2>
              <h2 className="currency-cap">Market Cap</h2>
              <h2 className="currency-percentage">24h Change</h2>
            </div>
            {cryptoData.map((coin) => (
              <Link
                key={coin.id}
                to={`/coins/${coin.id}`}
                className="market-currency-link"
              >
                <div className="market-currency">
                  <img
                    className="currency-icon"
                    src={coin.image}
                    alt={coin.name}
                  />
                  <p className="currency-name">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </p>
                  <p className="currency-price">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p className="currency-cap">
                    ${formatter.format(coin.market_cap)}
                  </p>
                  <p
                    className={`currency-percentage ${
                      coin.price_change_percentage_24h > 0
                        ? "percentage-increase"
                        : coin.price_change_percentage_24h < 0
                        ? "percentage-decrease"
                        : "percentage-neutral"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </p>
                </div>
              </Link>
            ))}
            <div className="pagination-buttons">
              {renderPaginationButtons()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
