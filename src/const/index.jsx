export const TOKEN_REFRESH_TIME = 6 * 24 * 60 * 60 * 1000;
export const regexAccount = /^([a-zA-Z0-9]+@.+?\.[a-z]{2,4})|(1\d{10})$/g;
export const defaultMenu = [
    {
        name: '首页',
        path: '/',
        className: 'menu-icon menu-index',
        child: [],
    },
    {
        name: '报警管理',
        path: '/main/alarmagement',
        className: 'menu-icon menu-alarm',
        child: [],
    },
    {
        name: '安全监测',
        path: '/main/monitor',
        className: 'menu-icon menu-safety',
        child: [],
    },
    {
        name: '用电分析',
        path: '/main/analysis',
        className: 'menu-icon menu-fee',
        child: [],
    },
];
