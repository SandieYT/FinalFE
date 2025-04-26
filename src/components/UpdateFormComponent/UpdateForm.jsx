import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import { PasswordStrengthIndicator } from "../../utils/passwordStrength";
import "./updateForm.css";

export default function UpdateForm({ userId, onUpdateSuccess }) {
  const updateMutation = useTodoMutation((data) =>
    userService.updateUser(userId, data)
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must be at least 3 characters").max(20),
      email: Yup.string().email("Invalid email"),
      role: Yup.string().oneOf(["admin", "user"], "Invalid role"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string().when("password", {
        is: (val) => val && typeof val === "string" && val.length > 0,
        then: (schema) =>
          schema
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: async (values) => {
      const updateData = {};
      if (values.username) updateData.username = values.username;
      if (values.email) updateData.email = values.email;
      if (values.role) updateData.role = values.role;
      if (values.password) updateData.password = values.password;

      try {
        await updateMutation.mutateAsync(updateData, {
          onSuccess: () => {
            toast.success("User updated successfully");
            formik.resetForm();
            onUpdateSuccess?.();
          },
          onError: (error) => {
            const serverError = error?.response?.data?.error;

            if (
              serverError?.code === "VAL_001" &&
              serverError?.details?.errors
            ) {
              formik.setErrors(serverError.details.errors);
              const firstError = Object.values(serverError.details.errors)[0];
              toast.error(firstError);
              return;
            }

            toast.error(
              serverError?.message ||
                error?.response?.data?.message ||
                "Failed to update user"
            );
          },
        });
      } catch (error) {
        console.error("Update failed:", error);
      }
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
              autoComplete="off"
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
              autoComplete="off"
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

          <div className="upForm-input-group">
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
              autoComplete="off"
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
            <PasswordStrengthIndicator password={formik.values.password} />
          </div>

          <div className="upForm-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="off"
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
            className="upForm-btn"
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
          >
            {formik.isSubmitting ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}
