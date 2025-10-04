import axios from "axios";

let navigateTo = null;
export const setNavigate = (fn) => {
  navigateTo = fn;
};

const API_URL = "https://ono.runasp.net/api";
// const API_URL = "https://localhost:7146/api";

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
    // console.log(error);

    // console.log(error.response.status === 401);
    // console.log(!originalRequest._retry);
    // console.log(!originalRequest.url.includes("/Auth/Refresh"));
    // console.log(!originalRequest.url.includes("/Auth/Login"));

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/Auth/Refresh") &&
      !originalRequest.url.includes("/Auth/Login") && 
      !originalRequest.url.includes("/Get-userRoles")
    ) {
      originalRequest._retry = true;
      try {
        // console.log("inside refresh")
        const response = await api.post("/Auth/Refresh");
        // console.log(response);
        return api(originalRequest);
      } catch {
        
        if (navigateTo) {
          navigateTo("/login");
        }

        return Promise.reject(error);
      }
    }

    // console.log(error);
    return Promise.reject(error);
  }
);

export default api;
