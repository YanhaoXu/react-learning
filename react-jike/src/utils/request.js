// axios的封装处理
import axios from "axios";
import { getToken } from "./token";

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 相应拦截器
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义配置
request.interceptors.request.use(
  (config) => {
    // 操作config 注入token数据
    // 1. 获取token数据
    const token = getToken();
    // 2. 按照后端格式要求做token的拼接
    // 拼接方式：config.headers.Authorization = `Bearer ${token}}`
    if (token) {
      config.headers.Authorization = `Beare ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围内的状态码都会触发该函数
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { request };
