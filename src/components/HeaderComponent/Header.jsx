import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./header.css";

export default function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);

  const handleSearchIconClick = () => {
    setSearchActive(true);
    searchRef.current.focus();
  };
  return (
    <>
      <header id="main-header">
        <div className="header-container">
          <div className="header-left">
            <div className="header-logo wave-container">
              <Link to="/" className="wave-text">
                <span>W</span>
                <span>I</span>
                <span>K</span>
                <span>I</span>
              </Link>
            </div>
            <div className="header-menu">
              <ul>
                <li>
                  <Link to="#">
                    <span>Buy Crypto</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span>Markets</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span>More</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">
            <div className={`header-search ${searchActive ? "active" : ""}`}>
              <input
                type="search"
                placeholder="Search"
                ref={searchRef}
                onBlur={() => setSearchActive(false)}
              />
              <CiSearch
                className="search-icon"
                onClick={handleSearchIconClick}
              />
            </div>
            <div className="header-auth">
              <div className="btn btn-login">
                <button>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                </button>
              </div>
              <div className="btn btn-register">
                <button>
                  <Link to="/register">
                    <span>Register</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
