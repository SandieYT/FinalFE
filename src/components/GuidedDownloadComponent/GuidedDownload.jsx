import React from "react";
import { Link } from "react-router-dom";

import "./guidedDownload.css";

export default function GuidedDownload() {
  return (
    <div className="guidedDownload-container">
      <div className="guidedDownload-content">
        <div className="guidedDownload-left">
          <div className="wallet-mode">
            <div className="wallet-mode-title">
              <div className="headline-tab-anim">
                <h2 className="tab-headline first-tab">Non Custodial</h2>
                <h2 className="tab-headline second-tab">Deposit</h2>
              </div>
            </div>
            <div className="video-waller-mode">
              <video autoPlay loop muted playsInline>
                <source src="/videos/679cb9d9d7565e087f99bb08_67a26d4ab17c4e7400aeabb4_0204-transcode.mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="guidedDownload-right">
          <h3>Trust Should Be an Option</h3>
          <div className="download-options">
            <Link to="#" className="download-btn app-store">
              <img
                src="/images/appstore-47ff262997f8d723706ca638f8bd9d67.svg"
                alt="Apple"
                className="download-icon"
              />
              App Store
            </Link>
            <Link to="#" className="download-btn android-apk">
              <img
                src="/images/android-bd8aee1484ce1680a0a815eac2a3e211.svg"
                alt="Android"
                className="download-icon"
              />
              Android APK
            </Link>
            <Link to="#" className="download-btn google-play">
              <img
                src="\images\googleplay-1e427977e42df2cfc0b148c2865179c2.png"
                alt="Google Play"
                className="download-icon"
              />
              Google Play
            </Link>
            <Link to="#" className="download-btn api">
              <img
                src="/images/api-03d915f9273477c6390cdc44006eb22f.svg"
                alt="API"
                className="download-icon"
              />
              API
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
