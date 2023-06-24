import { useLocation } from 'react-router-dom';
interface ApiConfig {
    app: string,
    baseUrl: string
}

const useApiConfig = (): ApiConfig => {
    const res: ApiConfig = {
        app: "",
        baseUrl: ""
    }
    const nothingAppPath = ['/login'];
    // 监听路由动态配置baseURL
    const location = useLocation();
    console.log('pathname', location.pathname);
    // && nothingAppPath.includes(location.pathname)
    if (location) {
        res.app = 'nothing-app';
        res.baseUrl = "http://localhost:3090";
    }
    return res;
}

export default useApiConfig;