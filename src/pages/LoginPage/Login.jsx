import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaTelegram } from "react-icons/fa";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await toast.promise(userService.loginUser(values), {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) => getErrorMessage(err),
        });

        if (response.success) {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const getErrorMessage = (error) => {
    return (
      error.response?.data?.error?.details?.message ||
      "Login failed. Please check your credentials and try again."
    );
  };

  return (
    <div id="main-login">
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <FaGoogle className="social-icon" /> Google
            </button>
            <button type="button" className="social-btn apple">
              <FaApple className="social-icon" /> Apple
            </button>
            <button type="button" className="social-btn telegram">
              <FaTelegram className="social-icon" /> Telegram
            </button>
          </div>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : ""
                }
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="input-group">
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
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-prompt">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
