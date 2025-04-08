import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/authSlice";

import "./header.css";

export default function Header() {
  const [searchActive, setSearchActive] = React.useState(false);
  const searchRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  const handleSearchIconClick = () => {
    setSearchActive(true);
    searchRef.current.focus();
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };
  return (
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
                <Link to="/transaction">
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
            <CiSearch className="search-icon" onClick={handleSearchIconClick} />
          </div>
          <div className="header-auth">
            {isAuthenticated ? (
              <div className="user-info">
                <span className="username">Hello {username}</span>
                <button onClick={handleLogout} className="header-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className="btn header-login-btn">
                  <button>
                    <Link to="/login">
                      <span>Login</span>
                    </Link>
                  </button>
                </div>
                <div className="btn header-register-btn">
                  <button>
                    <Link to="/register">
                      <span>Register</span>
                    </Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
