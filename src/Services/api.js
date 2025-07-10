import axios from "axios";

//const API_URL = "http://193.227.24.31:5050/api";
const API_URL = "https://localhost:7146/api";

const api = axios.create({
  baseURL: API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/Auth/Refresh") &&
      !originalRequest.url.includes("/Auth/Get-Profile") &&
      !originalRequest.url.includes("/Auth/Login")
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/Auth/Refresh");
        return api(originalRequest);
      } catch {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
