export const TOKEN_REFRESH_TIME = 6 * 24 * 60 * 60 * 1000;
export const regexAccount = /^([a-zA-Z0-9]+@.+?\.[a-z]{2,4})|(1\d{10})$/g;
export const defaultMenu = [
    {
        name: '首页',
        path: '/',
        className: 'menu-icon iconfont icon-user',
        iconType: 'icon-user',
        child: [],
    },
    {
        name: '应用',
        path: '/compareeffectapi',
        className: 'menu-icon iconfont icon-app',
        iconType: 'icon-app',
        child: [],
    },
    {
        name: '懒加载',
        path: '/imglazyload',
        className: 'menu-icon iconfont icon-img',
        iconType: 'icon-app',
        child: [],
    },
    {
        name: '图片上传',
        path: '/imgupload',
        className: 'menu-icon iconfont icon-img',
        iconType: 'icon-app',
        child: [],
    },
    {
        name: '运行监测',
        path: '/main/monitor',
        className: 'menu-icon iconfont icon-computer',
        iconType: 'icon-computer',
        child: [],
    },
];
