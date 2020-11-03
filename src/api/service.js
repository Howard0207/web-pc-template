import axios from 'axios';
import { clearStorage, errorCapture } from '_utils';
import { refreshToken } from '_src/api';
import { TOKEN_REFRESH_TIME } from '_const';

/**
 * 自定义实例默认值
 */
const instance = axios.create({ timeout: 10000 }); // 请求超时

/**
 * 自动 更新token
 */
// const updateToken = async () => {
//     const expireTime = localStorage.getItem('zhidianu_expireTime');
//     localStorage.setItem('zhidianu_expireTime', new Date().getTime() + TOKEN_REFRESH_TIME);
//     const [error] = await errorCapture(refreshToken);
//     if (error) {
//         localStorage.setItem('zhidianu_expireTime', expireTime);
//     }
// };

instance.interceptors.request.use(
    (config) => {
        const extendConfig = config;
        // 在发送请求之前做些什么（这里写展示loading的逻辑代码 ）
        // 获取token，配置请求头
        const TOKEN = localStorage.getItem('zhidianu_token');
        // const expireTime = localStorage.getItem('zhidianu_expireTime');
        // const curTime = +new Date();
        if (TOKEN) {
            // 配置请求头 token
            extendConfig.headers['Content-Type'] = 'application/json';
            extendConfig.headers.Authorization = TOKEN;
        }
        // if (expireTime < curTime) {
        //     updateToken();
        // }
        return extendConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const { status } = response;
        if (status === 401) {
            clearStorage();
            window.location.href = '/login';
        }
        return response.data;
    },
    (error) => {
        // 对响应错误做点什么
        const { status } = error.response;
        if (status === 401) {
            clearStorage();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
instance.CancelToken = Axios.CancelToken;
instance.isCancel = Axios.isCancel;
export default instance;
