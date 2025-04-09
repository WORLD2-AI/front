import  {axiosInstance}  from "./baseaxios.js";

// 导出注册用户的API
function register (userData) {
  const url = '/check/user/register'; // 假设这是注册用户的服务器端点
  return axiosInstance.post(url, userData);
}
function login (userData) {
  const url = '/check/user/login'; // 假设这是登录用户的服务器端点
  return axiosInstance.post(url, userData);
}

function logout (userData) {
  const url = '/auth/user/logout'; // 假设这是登录用户的服务器端点
  return axiosInstance.get(url, userData);
}
export  default {
    register,
    login,
    logout,
}