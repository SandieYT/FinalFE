import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { TransactionContext } from "../../context/TransactionContext";
import "./transaction.css";

export default function Transaction() {
  const { sendTransaction } = useContext(TransactionContext);

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
      <div className="transaction-container">
        <div className="transaction-left">
          <h1>Send Crypto Easily</h1>
        </div>
        <div className="transaction-right">
          <div className="transaction-header">
            <h1>Send Crypto</h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="transaction-form">
            <div className="transaction-form-group">
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

            <div className="transaction-form-group">
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

            <div className="transaction-form-group">
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
              className="transaction-btn"
            >
              {formik.isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
