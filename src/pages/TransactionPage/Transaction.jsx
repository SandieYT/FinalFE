import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import useFetchGifFromKeyword from "../../hooks/useFetchGif";
import "./transaction.css";

export default function Transaction() {
  const { currentAccount, sendTransaction, transactions } =
    useContext(TransactionContext);

  console.log(transactions);

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const formik = useFormik({
    initialValues: {
      addressTo: "",
      amount: "",
      keyword: "",
      message: "",
    },
    validationSchema: Yup.object({
      addressTo: Yup.string().required("Address is required"),
      amount: Yup.string()
        .required("Amount is required")
        .test("is-valid-amount", "Invalid amount format", (value) =>
          /^\d*\.?\d+$/.test(value)
        )
        .test(
          "is-positive",
          "Amount must be positive",
          (value) => parseFloat(value) > 0
        )
        .test(
          "max-amount",
          "Amount cannot exceed 100 ETH",
          (value) => parseFloat(value) <= 100
        ),
      keyword: Yup.string()
        .required("Keyword is required")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Keyword can only contain letters and numbers"
        ),
      message: Yup.string()
        .required("Message is required")
        .max(200, "Message cannot exceed 200 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const { addressTo, amount, keyword, message } = values;

        if (!addressTo || !amount || !keyword || !message) return;

        await sendTransaction(addressTo, amount, keyword, message);
        toast.success("Transaction sent successfully!");
      } catch (error) {
        console.error("Transaction error:", error);
        toast.error("Transaction failed: " + error.message);
      }
    },
  });

  const TransactionItem = ({ transaction }) => {
    const gifUrl = useFetchGifFromKeyword(transaction.keyword);

    return (
      <div className="tx-history-item">
        <div className="tx-history-meta">
          <div className="tx-history-address">
            <span className="tx-history-label">From:</span>
            <span className="tx-history-value">
              {shortenAddress(transaction.addressFrom)}
            </span>
          </div>
          <div className="tx-history-address">
            <span className="tx-history-label">To:</span>
            <span className="tx-history-value">
              {shortenAddress(transaction.addressTo)}
            </span>
          </div>
          <div className="tx-history-amount">{transaction.amount} ETH</div>
        </div>
        <div className="tx-history-meta">
          <div className="tx-history-message">{transaction.message}</div>
          {transaction.keyword && (
            <div className="tx-history-label">
              Keyword: {transaction.keyword}
            </div>
          )}
        </div>
        {gifUrl && (
          <div className="tx-history-gif">
            <img
              src={gifUrl}
              alt={transaction.keyword}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
        )}
        <div className="tx-history-time">
          {new Date(transaction.timestamp).toLocaleString()}
        </div>
      </div>
    );
  };
  return (
    <div id="main-tx">
      <div className="tx-container">
        <div className="tx-welcome">
          <div className="tx-left">
            <h1>
              Send Crypto <br /> across the{" "}
              <span className="gradient-text">world</span>
            </h1>
            <p className="tx-subtext">
              Explore the crypto world. Buy and sell cryptocurrencies easily on
              Crypto.
            </p>
            <div className="tx-features-grid">
              <div>Reliability</div>
              <div>Security</div>
              <div>Ethereum</div>
              <div>Web 3.0</div>
              <div>Low fees</div>
              <div>Blockchain</div>
            </div>
          </div>
          <div className="tx-right">
            <div className="tx-card">
              <div className="tx-eth-icon">⬤</div>
              <p className="tx-card-address">
                {currentAccount ? shortenAddress(currentAccount) : "0x..."}
              </p>
              <p className="tx-card-network">Ethereum</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="tx-form">
              <div className="tx-form-group">
                <label htmlFor="addressTo">Address To</label>
                <input
                  id="addressTo"
                  name="addressTo"
                  type="text"
                  placeholder="Address To"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addressTo}
                  className={
                    formik.touched.addressTo && formik.errors.addressTo
                      ? "input-error"
                      : ""
                  }
                />
                {formik.touched.addressTo && formik.errors.addressTo && (
                  <div className="error-message">{formik.errors.addressTo}</div>
                )}
              </div>

              <div className="tx-form-group">
                <label htmlFor="amount">Amount (ETH)</label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="Amount (ETH)"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    formik.setFieldValue("amount", value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  className={
                    formik.touched.amount && formik.errors.amount
                      ? "input-error"
                      : ""
                  }
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="error-message">{formik.errors.amount}</div>
                )}
              </div>

              <div className="tx-form-group">
                <label htmlFor="keyword">Keyword (Gif)</label>
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder="Keyword (Gif)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.keyword}
                  className={
                    formik.touched.keyword && formik.errors.keyword
                      ? "input-error"
                      : ""
                  }
                />
                {formik.touched.keyword && formik.errors.keyword && (
                  <div className="error-message">{formik.errors.keyword}</div>
                )}
              </div>

              <div className="tx-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  className={
                    formik.touched.message && formik.errors.message
                      ? "input-error"
                      : ""
                  }
                />
                {formik.touched.message && formik.errors.message && (
                  <div className="error-message">{formik.errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="tx-btn"
              >
                {formik.isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
        <div className="tx-history">
          <h3>Transaction History</h3>
          <div className="tx-history-list">
            {sortedTransactions.map((tx, idx) => (
              <TransactionItem key={idx} transaction={tx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
