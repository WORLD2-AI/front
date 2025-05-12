import axios from 'axios';

// 配置axios的基地址，根据你的服务器地址进行设置
const API_BASE_URL = 'http://localhost:8080/api';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 请求超时时间
});
const axiosInstanceTicket = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000, // 请求超时时间
  });
// 添加请求拦截器
axiosInstance.interceptors.request.use(async function (config) {
 
    // 这里假设你要在请求完成后发送另一个请求
    const anotherResponse = await getTicket();
    
    // 将获取到的数据设置到当前请求的headers中
    config.headers['ticket'] = anotherResponse.data.ticket;
 
    // 然后返回config以发送请求
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
axiosInstance.defaults.withCredentials = true;

// 添加响应拦截器
axiosInstance.interceptors.response.use(response => {
  // 处理响应数据
  return response;
}, error => {
  // 处理响应错误
  return Promise.reject(error.response);
});

async function getTicket () {

   return  await axiosInstanceTicket.get('/limit/register/ticket')
}
    
export { axiosInstance};