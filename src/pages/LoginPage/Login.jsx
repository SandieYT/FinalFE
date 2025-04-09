import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaTelegram } from "react-icons/fa";
import userService from "../../services/userService";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";

import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useTodoMutation((data) => userService.loginUser(data));

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.error?.details?.message ||
      "Login failed. Please check your credentials and try again."
    );
  };

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
        const response = await toast.promise(
          loginMutation.mutateAsync(values),
          {
            loading: "Logging in...",
            success: "Login successful!",
            error: (err) => getErrorMessage(err),
          }
        );

        if (response?.success) {
          const decoded = jwtDecode(response?.data.accessToken);
          dispatch(
            loginSuccess({
              username: decoded.data.username,
              email: decoded.data.email,
              accessToken: response.data.accessToken,
              userId: decoded.data.userId,
            })
          );
          navigate("/");
        }
      } catch (error) {
        console.log("Login error:", error);
      }
    },
  });

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
            <span className="divider-line" />
            <span className="divider-text">or</span>
            <span className="divider-line" />
          </div>

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
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
                autoComplete="current-password"
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
              <Link to="#" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-prompt">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
