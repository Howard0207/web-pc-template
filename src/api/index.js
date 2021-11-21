import axios from './service';

export const login = (requestParameters) => {
    return axios.post('/account/login', requestParameters).then((res) => {
        if (res.code === 200) {
            localStorage.setItem('token', `Bearer ${res.data.token}`);
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
