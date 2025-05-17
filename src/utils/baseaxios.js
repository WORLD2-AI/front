import axios from "axios";

// Configure the base address of Axios and set it according to your server address
// const API_BASE_URL = "http://localhost:5173/login";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "/",
});
const axiosInstanceTicket = axios.create({
  baseURL: "/",
});
// Add request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    // What to do about request errors
    return Promise.reject(error);
  }
);
axiosInstance.defaults.withCredentials = true;

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Processing response data
    return response;
  },
  (error) => {
    // Handling response errors
    return Promise.reject(error.response);
  }
);

// async function getTicket() {
//   return await axiosInstanceTicket.get("/limit/register/ticket");
// }

export { axiosInstance };
