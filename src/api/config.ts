import axios, { type AxiosRequestConfig, type AxiosInstance } from "axios";
// 请求前缀

const options: AxiosRequestConfig = {
    baseURL: "http://localhost:3080",
};

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create(options);

// response拦截
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.error(err, "网络错误");
    }
)

export { axiosInstance };

