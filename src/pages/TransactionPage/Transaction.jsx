import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { TransactionContext } from "../../context/TransactionContext";
import "./transaction.css";

export default function Transaction() {
  const { connectWallet, sendTransaction, currentAccount } = useContext(TransactionContext);
  console.log(sendTransaction)

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

  return (
    <div id="main-transaction">
      <section className="transaction-container">
        <div className="transaction-left">
          <h1>Send Crypto Easily with Wiki</h1>
          {currentAccount?
              // <Link to="/transaction" className="transaction-wallet-button" onClick={disconnectWallet}>
              //   Disconnect your wallet
              // </Link>
              <></>
              :<Link to="/transaction" className="transaction-wallet-button" onClick={connectWallet}>
                Connect your wallet
              </Link>}
        </div>
        <div className="transaction-right">
          <div className="transaction-form-header">
          <div className="transaction-form-header-top">
            <div className="transaction-form-header-icon"/> 
          </div>
          <div className="transaction-form-header-bottom">
          <p>Address</p>
          <h2>Ethereum</h2>
          </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="transaction-form-container">
            <div className="transaction-form-content">
            <div className="transaction-form-group">
              <input
                id="addressTo"
                name="addressTo"
                type="text"
                placeholder="Address To"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressTo}
                className="transaction-form-field"
              />
              {formik.touched.addressTo && formik.errors.addressTo && (
                <div className="transaction-error-message">{formik.errors.addressTo}</div>
              )}
            </div>

            <div className="transaction-form-group">
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
                className="transaction-form-field"

              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="transaction-error-message">{formik.errors.amount}</div>
              )}
            </div>

            <div className="transaction-form-group">
              <input
                id="keyword"
                name="keyword"
                type="text"
                placeholder="Keyword (Gif)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.keyword}
                className="transaction-form-field"

              />
              {formik.touched.keyword && formik.errors.keyword && (
                <div className="transaction-error-message">{formik.errors.keyword}</div>
              )}
            </div>

            <div className="transaction-form-group">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="transaction-form-field"

              />
              {formik.touched.message && formik.errors.message && (
                <div className="transaction-error-message">{formik.errors.message}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || !currentAccount}
              className={(!formik.isValid || formik.isSubmitting || !currentAccount)?"transaction-form-submit-unavailable":"transaction-form-submit"}
            >
              {formik.isSubmitting ? "Sending..." : (currentAccount?"Send":"Connect wallet to Send")}
            </button>
            </div>
          </form>
        </div>
      </section>
      
    </div>
  );
}
