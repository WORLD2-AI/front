import { axiosInstance } from "./baseaxios.js";
import { ElNotification } from "element-plus";
// import router from "vue-router";
const baseURL = "http://192.168.1.6:5000/login";
// 导出注册用户的API
function register(userData) {
  const oldurl = "/login/register"; 
  const url= '/characters/api/register_user'
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
    // .then((res) => {
    //   console.log(res, "resres");
    // })
    // .catch((req) => {
    //   console.log(req, "reqreq");
    //   ElNotification({
    //     title: "提示",
    //     message: req.data,
    //     type: "warning",
    //   });
    // });
}
function login(userData) {
  const oldurl = "/login/login"; //
  const url = "/characters/api/login"; 
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
}

function logout(userData) {
  const oldurl = "/auth/user/logout"; // 假设这是登录用户的服务器端点
  const url = "/characters/api/logout"; // 假设这是登录用户的服务器端点
  return axiosInstance.get(url, userData);
}
function profile(userData) {
  const url = `/login/profile`;
  return axiosInstance.get(url, userData);
}
function twitter() {
  const url = `/login/twitter`;
  console.log('/login/twitter');
  return axiosInstance.get(url);
}
export default {
  register,
  login,
  logout,
  profile,
  twitter
};
