import { type AxiosRequestConfig, AxiosResponse } from "axios";
import { apiKeyType, apiKeyDataType } from '../urls/apiConstant';
import service from "./service";
import { cancelRequest } from "./http";

export class Request {
    private loading: boolean;

    constructor() {
        this.loading = false;
    }

    /**
     * 发送请求
     * @param url 请求地址
     * @param method 请求方法
     * @param params 请求参数
     * @param options 请求配置
     */
    async request<T extends apiKeyType>(obj: AxiosRequestConfig & { url: T }): Promise<apiKeyDataType[T]> {
        try {
            this.loading = true;
            return service(obj)
        } catch (error) {
            throw error;
        } finally {
            this.loading = false;
        }
    }

    /**
     * 设置是否开启遮罩层
     * @param loading 是否开启遮罩层
     */
    setLoading(loading: boolean): void {
        this.loading = loading;
    }

    /**
     * 获取接口返回状态
     * @param response 请求响应
     */
    getStatusCode(response: AxiosResponse): number {
        return response.status;
    }

    /**
     * 取消请求
     */
    cancel(): void {
        cancelRequest()
    }
}
