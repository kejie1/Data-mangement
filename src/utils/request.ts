/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 11:29:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-08 11:34:42
 * @Description:
 */
// axios封装
import axios from "axios";
import { AxiosResponse } from "axios";
import { getToken, removeToken } from "@/utils/index";
import { message } from "antd";
import router from "@/route";
let baseURL: string;
if (process.env.ENV === "dev") {
  baseURL = "xxx本地环境xxx";
} else if (process.env.ENV === "prod") {
  baseURL = "xxx生产环境xxx";
}
const request = axios.create({
  baseURL,
  timeout: 1000 * 5,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // axios拦截器配置token
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface IHomeData extends AxiosResponse {
  code: number;
  data: any;
  message: string;
}
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<IHomeData, any>) => {
    return response.data;
  },
  (error) => {
    httpErrorStatusHandle(error);
    return Promise.reject(error.response);
  }
);
// 处理异常的函数
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  let msg = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        msg = "接口重定向了！";
        break;
      case 400:
        msg = "参数不正确！";
        break;
      case 401:
        removeToken();
        msg = "您未登录，或者登录已经超时，请先登录！";
        router.navigate("/login");
        window.location.reload();
        break;
      case 403:
        msg = "您没有权限操作！";
        break;
      case 404:
        msg = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        msg = "请求超时！";
        break;
      case 409:
        msg = "系统已存在相同数据！";
        break;
      case 500:
        msg = "服务器内部错误！";
        break;
      case 501:
        msg = "服务未实现！";
        break;
      case 502:
        msg = "网关错误！";
        break;
      case 503:
        msg = "服务不可用！";
        break;
      case 504:
        msg = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        msg = "HTTP版本不受支持！";
        break;
      default:
        msg = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) msg = "网络请求超时！";
  if (error.message.includes("Network"))
    msg = window.navigator.onLine ? "服务端异常！" : "您断网了！";
  message.error(msg || "Error");
}
export { request };
