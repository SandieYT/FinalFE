import React from "react";
import { Link } from "react-router-dom";
import { Welcome, Footer, GuidedDownload, FAQ } from "../../components";
import "./home.css";

export default function Home() {
  return (
    <div id="main-home">
      <section>
        <Welcome />
        <div className="newIndex-marquee">
          <ul>
            <li>
              <Link to="#">
                <span>
                  [Netherlands Only] USDQ listings: Rewards galore with 50% APR
                  staking, USDQ airdrop and more!
                </span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>
                  Legends of Trade: VIP Arena, Compete for a Share of 1,000,000
                  USDT and Exclusive Rewards
                </span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>
                  [Trading Challenge] Spin and Rise Stronger With Wiki: Win
                  Guaranteed Prizes Up to 35,000 USDT!
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <GuidedDownload />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
