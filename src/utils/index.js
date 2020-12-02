export * from './base';
export const toLogin = () => {
    document.cookie = `uplus_cloud='';path=/;domain=soejh.com;expires=${new Date(0).toUTCString()}`;
    window.location.replace('/login');
};
/**
 * 保存当前工厂
 * @param { type: Object, desc: 当前工厂信息 } factory
 */
export function setLocalCurrentFactory(factory) {
    const current = JSON.stringify(factory);
    localStorage.setItem('currentFactory', current);
}
