import { axiosInstance } from "./baseaxios.js";
import { ElNotification } from "element-plus";
// import router from "vue-router";
const baseURL = "http://192.168.1.6:5000/login";

function register(userData) {
  const url = "/characters/api/register_user";
  const formData = new FormData();
  for (const key in userData) {
    if (Object.hasOwnProperty.call(userData, key)) {
      const element = userData[key];
      formData.append(key, element);
    }
  }
  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Clearly set Content Type
    },
  });
}
function login(userData) {
  const url = "/characters/api/login";
  const formData = new FormData();
  for (const key in userData) {
    if (Object.hasOwnProperty.call(userData, key)) {
      const element = userData[key];
      formData.append(key, element);
    }
  }
  return axiosInstance.post(url, formData);
}

function logout() {
  const url = "/characters/logout";
  return axiosInstance.post(url);
}
function profile() {
  const url = `/characters/api/user/profile`;
  return axiosInstance.get(url);
}
function twitter() {
  const url = `/login/login/twitter`;
  return axiosInstance.get(url);
}
function upload(fileData) {
  const url = "/characters/api/upload_avatar";
  return axiosInstance.post(url, fileData);
}
function downLoad(filename) {
  return axiosInstance.get(`/characters/images${filename}`, {
    responseType: "blob",
  });
}
// Export API for registered users
export default {
  register,
  login,
  logout,
  profile,
  twitter,
  upload,
  downLoad,
};
