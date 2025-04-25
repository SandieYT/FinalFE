import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const userService = {
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
      const token = jwtDecode(Cookies.get("accessToken"));
      return token.data;
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
      throw new Error(
        error.message || "An error occurred while fetching users"
      );
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
    console.log("Deleting user with ID:", userId);
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
};

export default userService;
