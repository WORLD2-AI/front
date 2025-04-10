import { axiosInstance } from "./baseaxios.js";
import { ElNotification } from "element-plus";
// import router from "vue-router";
const baseURL = "http://192.168.1.6:5000/login";
// 导出注册用户的API
function register(userData) {
  const url = "/login/register"; // 假设这是注册用户的服务器端点
  const formData = new FormData();
  for (const key in userData) {
    if (Object.hasOwnProperty.call(userData, key)) {
      const element = userData[key];
      formData.append(key, element);
    }
  }
  return axiosInstance
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 明确设置Content-Type
      },
    })
    .then((res) => {
      console.log(res, "resres");
    })
    .catch((req) => {
      console.log(req, "reqreq");
      ElNotification({
        title: "提示",
        message: req.data,
        type: "warning",
      });
    });
}
function login(userData) {
  const url = "/check/user/login"; // 假设这是登录用户的服务器端点
  return axiosInstance.post(url, userData);
}

function logout(userData) {
  const url = "/auth/user/logout"; // 假设这是登录用户的服务器端点
  return axiosInstance.get(url, userData);
}
function profile(userData) {
  const url = `/login/profile`;
  return axiosInstance.get(url, userData);
}
export default {
  register,
  login,
  logout,
  profile,
};
