import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About</h4>
          <Link to="#">
            <span>About Wiki</span>
          </Link>
          <Link to="#">
            <span>Press Room</span>
          </Link>
          <Link to="#">
            <span>Wiki Communities</span>
          </Link>
          <Link to="#">
            <span>Announcements</span>
          </Link>
          <Link to="#">
            <span>Risk Disclosure</span>
          </Link>
          <Link to="#">
            <span>Whistleblower Channel</span>
          </Link>
          <Link to="#">
            <span>Careers</span>
          </Link>
          <Link to="#">
            <span>Islamic Account</span>
          </Link>
          <Link to="#">
            <span>Fees & Transactions Overview</span>
          </Link>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <Link to="#">
            <span>One-Click Buy</span>
          </Link>
          <Link to="#">
            <span>P2P Trading (0 Fees)</span>
          </Link>
          <Link to="#">
            <span>VIP Program</span>
          </Link>
          <Link to="#">
            <span>Referral Program</span>
          </Link>
          <Link to="#">
            <span>Institutional Services</span>
          </Link>
          <Link to="#">
            <span>Listing Application</span>
          </Link>
          <Link to="#">
            <span>Tax API</span>
          </Link>
          <Link to="#">
            <span>Audit</span>
          </Link>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <Link to="#">
            <span>Submit a Request</span>
          </Link>
          <Link to="#">
            <span>Help Center</span>
          </Link>
          <Link to="#">
            <span>Support Hub</span>
          </Link>
          <Link to="#">
            <span>User Feedback</span>
          </Link>
          <Link to="#">
            <span>Wiki Learn</span>
          </Link>
          <Link to="#">
            <span>Trading Fee</span>
          </Link>
          <Link to="#">
            <span>API</span>
          </Link>
          <Link to="#">
            <span>Authenticity Check</span>
          </Link>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <Link to="/transaction">
            <span>Exchange</span>
          </Link>
          <Link to="#">
            <span>Derivatives</span>
          </Link>
          <Link to="#">
            <span>Earn</span>
          </Link>
          <Link to="#">
            <span>Launchpad</span>
          </Link>
          <Link to="#">
            <span>Wiki Card</span>
          </Link>
          <Link to="#">
            <span>TradingView</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
