import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { JsonRpcApiProvider } from "ethers";

const userService = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.password,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message:
                error.response.data.error?.message || "Registration failed",
            },
          },
        };
      }
      throw new Error(error.message || "An error occurred during registration");
    }
  },

  getUser: async () => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Failed to fetch user",
            },
          },
        };
      }
    }
  },

  loginUser: async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email, password }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Login failed",
            },
          },
        };
      }
      throw new Error(error.message || "An error occurred during login");
    }
  },

  logoutUser: async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Logout failed",
            },
          },
        };
      }
      throw new Error(error.message || "An error occurred during logout");
    }
  },

  listUsers: async ({ page, limit, search }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/admin`,
        {
          params: { page, limit, search },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Failed to fetch users",
            },
          },
        };
      }
      throw new Error(
        error.message || "An error occurred while fetching users"
      );
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/delete/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Failed to delete user",
            },
          },
        };
      }
      throw new Error(error.message || "An error occurred while deleting user");
    }
  },

  updateUser: async (userId, updateData) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update/${userId}`,
        updateData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw {
          response: {
            data: {
              ...error.response.data,
              message: error.response.data.message || "Failed to update user",
            },
          },
        };
      }
      throw new Error(error.message || "An error occurred while updating user");
    }
  },
};

export default userService;
