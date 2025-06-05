import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./search.css";
import { CiSearch } from "react-icons/ci";

function highlightMatch(text, query) {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <u><b>{match}</b></u>
      {after}
    </>
  );
}

export default function Search() {
  const [cryptoData, setCryptoData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { qr } = useParams();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/search",
            {
              params: {
                query: qr,
              },
            }
          );
          const start = (page - 1) * 20;
          const end = start + 20;
          setFullData(response.data.coins)
          setCryptoData(response.data.coins.slice(start, end));
          setTotalPages(Math.floor(response.data.coins.length/20)+1);
      } catch (error) {
          setFullData([])
          setCryptoData([]);
          setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, qr]);

  const renderPaginationButtons = () => {
    if (totalPages == 1) {
      return []
    }
    const buttons = [];
    const maxVisibleButtons = 3;
    let startPage, endPage;

    if (totalPages <= maxVisibleButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const before = Math.floor(maxVisibleButtons / 2);
      const after = Math.ceil(maxVisibleButtons / 2) - 1;
      if (page <= before) {
        startPage = 1;
        endPage = maxVisibleButtons;
      } else if (page + after >= totalPages) {
        startPage = totalPages - maxVisibleButtons + 1;
        endPage = totalPages;
      } else {
        startPage = page - before;
        endPage = page + after;
      }
    }

    buttons.push(
      <>
                <input
            key="page-input"
            type="number"
            min={1}
            className="search-pagination-input"
            placeholder="Go to..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  setPage(value);
                }
              }
            }}
          />
      <button
        key="prev"
        className={`search-pagination-button prev ${page === 1 ? "disabled" : ""}`}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        &lt;
      </button>
      </>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`search-pagination-button ${page === 1 ? "current" : ""}`}
          onClick={() => setPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
                    <span key="start-ellipsis" className="search-pagination-ellipsis">
            ···
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`search-pagination-button ${page === i ? "current" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="search-pagination-ellipsis">
            ···
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={`search-pagination-button ${page === totalPages ? "current" : ""}`}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className={`search-pagination-button next ${page === totalPages ? "disabled" : ""}`}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  const handleSearchIconClick = () => {
    const query = searchRef.current?.value.trim();
    if (query) {
     navigate(`/search/${query}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = searchRef.current?.value.trim();
      if (query) {
         navigate(`/search/${query}`);
      }
    }
  }

  return (
    <div id="main-search">
      <div className="search-container">
        <h1 className="search-header">Search for "{qr}"</h1>
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="search-currencies">
            <div className="search-currency-header">
              <h2 className="currency-name-header">{fullData.length} Results for "{qr}"</h2>
              <p className="currency-name-header">Showing result no. {page*20-19} - {page*20-20+cryptoData.length} for "{qr}"</p>
              <div className="search-search">
                <input
                  type="search"
                  placeholder="Search"
                  ref={searchRef}
                  onKeyDown={handleKeyDown}
                />
                <CiSearch className="search-icon" onClick={handleSearchIconClick} />
              </div>
            </div>
            {
              cryptoData.map((coin) => (
            
              <Link
                key={coin.id}
                to={`/coins/${coin.id}`}
                className="search-currency-link"
              >
                <div className="search-currency">
                  <img
                    className="currency-icon"
                    src={coin.large}
                    alt={coin.name}
                  />
                  <p className="currency-name">
                    
                    {highlightMatch(coin.name,qr)} ({coin.symbol.toUpperCase()})
                  </p>
                </div>
              </Link>
            ))
            }
            <div className="search-pagination-buttons">
              {renderPaginationButtons()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
