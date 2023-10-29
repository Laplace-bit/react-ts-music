
import axios, { Method, AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosInterceptorManager, AxiosResponse } from 'axios';
import qs from 'qs';

interface myResponse {
    category: number,
    code: number,
    result: any,
}

/*
NewAxiosInstance接口得根据自己情况来定
  interceptors属性是必须要有，因为后续要用到拦截器
  至于<T = any>(config: AxiosRequestConfig): AxiosPromise<T>这一段代码，因为我后续二次封装axios时采用的是此类型，所以我这里
  声明的是这种数据类型
*/
interface NewAxiosInstance extends AxiosInstance {
    /*
    设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
    */
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<myResponse>>;
    }
}

//基本的初始化设置
let http: NewAxiosInstance = axios.create({
    // baseURL: "/nothing", //因为使用的是vite构建的项目，所以这里是这么获取代理名称的，根据自己情况修改
    // baseURL: "http://localhost:3000", //因为使用的是vite构建的项目，所以这里是这么获取代理名称的，根据自己情况修改
    timeout: 30 * 1000,// 超时时间
    withCredentials: true, // 跨域
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data'
    // }
});

// 请求拦截器
const QS_METHOD: Method[] = ['POST', 'post', 'PUT', 'put'];
const GET_METHOD: Method[] = ['GET', 'get', 'DELETE', 'delete'];

http.interceptors.request.use(request => {
    // cancel request
    request.cancelToken = cancelSource.token;

    if (request.url?.includes('file')) {
        // 将请求头 Content-Type 设置为 multipart/form-data，以确保正确处理文件上传。这是因为文件上传需要使用 multipart/form-data 编码类型，该类型可以将文件和其他表单字段数据一起发送到服务器。
        // const headers = request.data.getHeaders();
        // request.headers['Content-Type'] = "multipart/form-data; boundary=" + generateBoundary();

        // 浏览器会自动设置Content-Type，另外应将整个formData赋值给data,无需做qs的处理！！！！！！
        return request;
    }
    if (request.method && QS_METHOD.includes(request.method)) {// 这里只处理post请求，根据自己情况修改
        request.data = qs.stringify(request.data);
    } else if (request.method && GET_METHOD.includes(request.method)) {//设置GET的请求参数
        request.params = qs.parse(request.data);
        request.data = undefined;
    }

    return request;
}, error => {
    return error;
});

// 生成边界信息
function generateBoundary() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
    return `--------------------------${timestamp}${randomString}`;
    // multipart/form-data; boundary=--------------------------16882680495162oqvkzso17i
    // multipart/form-data; boundary=--------------------------847010267381757906638423
}

//响应拦截器
http.interceptors.response.use(response => {
    return Promise.resolve(response);
}, error => {
    return error;
});

// 创建一个CancelToken实例
const cancelSource = axios.CancelToken.source();

// 创建一个取消请求的函数
export function cancelRequest() {
    cancelSource.cancel("请求被取消");
}



export default http;