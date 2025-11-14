import axios from "axios";

let navigateTo = null;
export const setNavigate = (fn) => {
  navigateTo = fn;
};

// const API_URL = "https://ono.runasp.net/api";
// const api = axios.create({
//   baseURL: "/api/",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

let API_URL = "";

if (import.meta.env.MODE === "development") {
  API_URL = "https://localhost:7146/api";
} else {
  API_URL = "/api/";
}

const api = axios.create({
  baseURL: API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      console.log(originalRequest);
      try {
        await api.post("/Auth/Refresh");

        console.log("called refresh token endpoint")

        return api(originalRequest);
      } catch {
        if (navigateTo) {
          navigateTo("/login");
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
