import axios from './service';

export const login = (requestParameters) => {
    return axios
        .post('unify-api/auth', requestParameters)
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
