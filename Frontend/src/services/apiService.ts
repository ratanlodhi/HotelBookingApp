import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

// Example: Fetch Hotels
export const getHotels = async () => {
  const res = await API.get("/hotels/");
  return res.data;
};

// Example: Login
export const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login/", { email, password });
  localStorage.setItem("token", res.data.access);
  return res.data;
};

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
