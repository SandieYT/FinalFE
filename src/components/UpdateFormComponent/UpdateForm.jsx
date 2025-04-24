import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./updateForm.css";

export default function UpdateForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be 20 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      role: Yup.string()
        .oneOf(["admin", "user"], "Invalid role")
        .required("Role is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form submitted:", values);
      // You can add your API call here
    },
  });

  return (
    <div className="upForm-container">
      <div className="upForm-content">
        <h2 className="upForm-title">Update User</h2>
        
        <form onSubmit={formik.handleSubmit} className="upForm-form">
          <div className="upForm-input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={
                formik.touched.username && formik.errors.username
                  ? "input-error"
                  : ""
              }
              placeholder="Enter username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error-message">{formik.errors.username}</div>
            )}
          </div>

          <div className="upForm-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email
                  ? "input-error"
                  : ""
              }
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="upForm-input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className={
                formik.touched.role && formik.errors.role
                  ? "input-error"
                  : ""
              }
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="error-message">{formik.errors.role}</div>
            )}
          </div>

          <div className="upForm-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.touched.password && formik.errors.password
                  ? "input-error"
                  : ""
              }
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="upForm-btn"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}