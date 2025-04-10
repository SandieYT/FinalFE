import React from "react";
import { Link } from "react-router-dom";
import { Welcome, Footer, GuidedDownload, FAQ } from "../../components";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./home.css";

export default function Home() {
  const [refWelcome, showWelcome] = useScrollAnimation();
  const [refDownload, showDownload] = useScrollAnimation();
  const [refFAQ, showFAQ] = useScrollAnimation();
  const [refFooter, showFooter] = useScrollAnimation();

  return (
    <div id="main-home">
      <section
        ref={refWelcome}
        className={`fade-in-up ${showWelcome ? "show" : ""}`}
      >
        {" "}
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
      <section
        ref={refDownload}
        className={`fade-in-up ${showDownload ? "show" : ""}`}
      >
        <GuidedDownload />
      </section>
      <section ref={refFAQ} className={`fade-in-up ${showFAQ ? "show" : ""}`}>
        <FAQ />
      </section>
      <section
        ref={refFooter}
        className={`fade-in-up ${showFooter ? "show" : ""}`}
      >
        <Footer />
      </section>
    </div>
  );
}
