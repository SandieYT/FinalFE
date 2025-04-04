import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./faq.css";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What is a cryptocurrency exchange?",
      answer: (
        <>
          Cryptocurrency exchanges are digital marketplaces that enable users to
          buy and sell cryptocurrencies like{" "}
          <span className="highlight">Bitcoin</span>,{" "}
          <span className="highlight">Ethereum</span>, and{" "}
          <span className="highlight">Tether</span>. The{" "}
          <span className="highlight">Binance</span> exchange is the largest
          crypto exchange by trade volume.
        </>
      ),
    },
    {
      question: "What products does Wiki provide?",
      answer: <span className="highlight">Wiki token</span>,
    },
    {
      question: "How to track cryptocurrency prices",
      answer: (
        <>
          The easiest way to track the latest cryptocurrency prices, trading
          volumes, trending altcoins, and market cap is the{" "}
          <span className="highlight">Wiki Cryptocurrency Directory</span>.
          Click on the coins to know historical coin prices, 24-hour trading
          volume, and the price of cryptocurrencies like{" "}
          <span className="highlight">Bitcoin</span>,{" "}
          <span className="highlight">Ethereum</span>,{" "}
          <span className="highlight">BNB</span> and others in real-time.
        </>
      ),
    },
    {
      question: "What are the trading fees on Bybit?",
      answer: <span className="highlight">Free</span>,
    },
  ];

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h2>FAQs</h2>
        <div className="faq-questions">
          <div className="faq-collapse">
            {faqItems.map((item, index) => (
              <div
                className={`faq-collapse-item ${
                  activeIndex === index ? "active" : ""
                }`}
                key={index}
              >
                <div
                  className="faq-collapse-header"
                  onClick={() => toggleItem(index)}
                >
                  <span className="faq-collapse-header-text">
                    {item.question}
                  </span>
                  <FaArrowUp />
                </div>
                <div className="faq-collapse-content">
                  <span>{item.answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
