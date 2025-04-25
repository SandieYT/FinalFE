import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import "./addForm.css";

export default function AddForm({ onSuccess }) {
  const createMutation = useTodoMutation(userService.registerUser);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(20)
        .required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      role: Yup.string()
        .oneOf(["admin", "user"], "Invalid role")
        .required("Role is Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is Required"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await toast.promise(createMutation.mutateAsync(values), {
          loading: "Creating user...",
          success: "User created successfully",
          error: (err) =>
            err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            "Failed to create user",
        });

        formik.resetForm();
        onSuccess?.();
      } catch (error) {
        console.error("Create failed:", error);
      }
    },
  });

  return (
    <div className="addForm-container">
      <div className="addForm-content">
        <h2 className="addForm-title">Add New User</h2>
        <form onSubmit={formik.handleSubmit} className="addForm-form">
          <div className="addForm-input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
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

          <div className="addForm-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="addForm-input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className={
                formik.touched.role && formik.errors.role ? "input-error" : ""
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="error-message">{formik.errors.role}</div>
            )}
          </div>

          <div className="addForm-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
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

          <div className="addForm-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "input-error"
                  : ""
              }
              placeholder="Confirm password"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error-message">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="addForm-btn"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
          >
            {formik.isSubmitting ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
