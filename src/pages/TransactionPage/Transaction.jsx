import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./transaction.css"

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
  return (
    <div id="main-transaction">
      <div className="transaction-container">
        <div className="transaction-decoration">
          <h1>some text here</h1>
        </div>
        <div className="transaction-form">
          <div className='transaction-card'>
            <h1>text</h1>
          </div>
          <div className='transaction-form-container'>
          <Formik
        initialValues={{
          addressTo: '',
          amount: '',
          keyword: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <div>
              <Field
                name="addressTo"
                type="text"
                className="transaction-form-field"
                placeholder="Address To"
              />
              <ErrorMessage name="addressTo" component="div" className="" />
            </div>
            <div>
              <Field
                name="amount"
                type="number"
                className="transaction-form-field"
                placeholder="Amount (ETH)"
              />
              <ErrorMessage name="amount" component="div" className="" />
            </div>

            <div>
              <Field
                name="keyword"
                type="text"
                className="transaction-form-field"
                placeholder="Keyword (Gif)"
              />
              <ErrorMessage name="keyword" component="div" className="" />
            </div>

            <div>
              <Field
                name="message"
                as="textarea"
                rows="5"
                className="transaction-form-field"
                placeholder="Message"
              />
              <ErrorMessage name="message" component="div" className="" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
