export * from './base';
export const toLogin = () => {
    document.cookie = `uplus_cloud='';path=/;domain=soejh.com;expires=${new Date(0).toUTCString()}`;
    if (window.env === 'development') {
        window.location.history.push('/login');
        // window.location.href = 'https://www.dev.uplus.soejh.com/login';
    } else {
        window.location.history.push('/login');
        // window.location.href = 'https://www.uplus.soejh.com/login';
    }
};
/**
 * 保存当前工厂
 * @param { type: Object, desc: 当前工厂信息 } factory
 */
export function setLocalCurrentFactory(factory) {
    const current = JSON.stringify(factory);
    localStorage.setItem('currentFactory', current);
}
