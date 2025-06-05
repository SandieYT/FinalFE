import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiLogOut, FiUser, FiSettings, FiDatabase  } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/authSlice";
import userService from "../../services/userService";
import "./header.css";

export default function Header() {
  const profile = useSelector((state) => state.auth);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, username, role } = useSelector(
    (state) => state.auth
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleLogout = async () => {
    try {
      await userService.logoutUser();
      dispatch(logoutSuccess());
      navigate("/");
      setShowDropdown(false);
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [isAuthenticated]);

  return (
    <header id="main-header">
      <div className="header-container unselectable">
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
                  <span>Exchange</span>
                </Link>
              </li>
              <li>
                <Link to="/markets">
                  <span>Markets</span>
                </Link>
              </li>
              {/* <li>
                <Link to="#">
                  <span>More</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="header-right">
          <div className="header-search">
            <input
              type="search"
              placeholder="Search"
              ref={searchRef}
              onKeyDown={handleKeyDown}
            />
            <CiSearch className="search-icon" onClick={handleSearchIconClick} />
          </div>
          <div className="header-auth">
            {isAuthenticated ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <img
                  src={profile.profile_picture}
                  alt="avatar"
                  className="user-avatar"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/my-profile");
                        setShowDropdown(false);
                      }}
                    >
                      <FiUser className="dropdown-icon" />
                      Profile
                    </div>
                    {role === "admin" && (
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          navigate("/dashboard");
                          setShowDropdown(false);
                        }}
                      >
                        <FiDatabase className="dropdown-icon"/>
                        Admin
                      </div>
                    )}
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/settings");
                        setShowDropdown(false);
                      }}
                    >
                      <FiSettings className="dropdown-icon" />
                      Settings
                    </div>
                    <div
                      className="dropdown-item header-logout-btn"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="dropdown-icon" />
                      Logout
                    </div>
                  </div>
                )}
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
