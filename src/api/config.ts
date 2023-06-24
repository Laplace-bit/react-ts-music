import http from './requestBase';
import apiList, { apiKeyType, apiKeyDataType } from './apiConstant';
import { AxiosRequestConfig } from 'axios';

/*
限制泛型T必须是接口列表（apiKeyType）中的key
限制obj中的url必须是接口列表中key的某一格
*/
const service = <T extends apiKeyType>(obj: AxiosRequestConfig & { url: T }) => {
    /*
    限制最终的返回数据类型
    */
    return new Promise<apiKeyDataType[T]>((resolve, reject) => {
        /*
        传递泛型给http中的拦截器
        */
        http<apiKeyDataType[T]>({
            url: apiList[obj.url],
            data: obj.data || {},
            params: obj.params || {},
            method: obj.method || 'GET',
            responseType: obj.responseType || 'json'
        }).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}
export default service;