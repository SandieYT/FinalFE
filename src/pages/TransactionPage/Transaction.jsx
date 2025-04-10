import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./transaction.css";

const validationSchema = Yup.object({
  addressTo: Yup.string()
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
    .required('Required'),
  amount: Yup.number()
    .typeError('Must be a number')
    .positive('Must be positive')
    .required('Required'),
  keyword: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export default function Transaction() {
  const formik = useFormik({
    initialValues: {
      addressTo: '',
      amount: '',
      keyword: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      





    },
  });

  return (
    <div id="main-transaction">
      <div className="transaction-container">
        <div className="transaction-left">
          <h1>some text here</h1>
        </div>
        <div className="transaction-right">
          <div className='transaction-card'>
            <h1>text</h1>
          </div>
          <div className='transaction-form-container'>
            <form onSubmit={formik.handleSubmit} className="transaction-form-content">
              <div className='transaction-form-flex1'>
                <input
                  id="addressTo"
                  name="addressTo"
                  type="text"
                  className="transaction-form-field"
                  placeholder="Address To"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addressTo}
                />
                {formik.touched.addressTo && formik.errors.addressTo ? (
                  <div className="transaction-field-error">{formik.errors.addressTo}</div>
                ) : null}
              </div>

              <div className='transaction-form-flex1'>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  className="transaction-form-field"
                  placeholder="Amount (ETH)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  step="any"
                />
                {formik.touched.amount && formik.errors.amount ? (
                  <div className="transaction-field-error">{formik.errors.amount}</div>
                ) : null}
              </div>

              <div className='transaction-form-flex1'>
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  className="transaction-form-field"
                  placeholder="Keyword (Gif)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.keyword}
                />
                {formik.touched.keyword && formik.errors.keyword ? (
                  <div className="transaction-field-error">{formik.errors.keyword}</div>
                ) : null}
              </div>

              <div className='transaction-form-flex3'>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="transaction-form-field"
                  placeholder="Message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                />
                {formik.touched.message && formik.errors.message ? (
                  <div className="transaction-field-error">{formik.errors.message}</div>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="transaction-form-submit"
              >
                {formik.isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}