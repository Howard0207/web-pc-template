import axios from './service';

export const login = (requestParameters) => {
    return axios
        .post('/api/auth', requestParameters)
        .then((res) => {
            if (res.access_token) {
                localStorage.setItem('zhidianu_token', `Bearer ${res.access_token}`);
                localStorage.setItem('zhidianu_refresh_token', res.refresh_token);
                localStorage.setItem('zhidianu_expireTime', +new Date() + 6 * 24 * 60 * 60 * 1000);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
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
