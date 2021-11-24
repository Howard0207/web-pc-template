import axios from './service';

export const login = (requestParameters) => {
    return axios.post('/account/login', requestParameters).then((res) => {
        if (res.code === 200) {
            localStorage.setItem('token', res.data.token);
            return res.data;
        }
        return Promise.reject(res);
    });
};

// 获取用户信息
export const fetchAccountInfo = () => {
    return axios.get('/api/example/user-info').then((res) => {
        if (res.code === 200) {
            return res.data;
        }
        return Promise.reject(res);
    });
};

// 获取工厂列表
export const fetchFactoryList = () => {
    return axios.get('/api/example/product-auth').then((res) => res.data);
};

export const fetchTest = (url) => {
    return axios.post(url).then((res) => {
        if (res.code === 200) {
            return res.data;
        }
        return Promise.reject(res);
    });
};
