import { errCapture } from '_utils';
import { fetchFactoryList, fetchAccountInfo } from '_src/api';
import * as constant from './globalContant';

export const setFactoryList = (factoryList) => {
    return {
        type: constant.CHANGE_FACTORY_LIST,
        data: factoryList,
    };
};

export const setUserInfo = (userInfo) => {
    return {
        type: constant.CHANGE_USERINFO,
        data: userInfo,
    };
};

export const setCurrentFactory = (factory) => {
    return {
        type: constant.CHANGE_CURRENTFACTORY,
        data: factory,
    };
};

// 工厂列表
export const requestFactoryList = () => {
    return (dispatch) => {
        const promise = fetchFactoryList();
        promise.then((factoryList) => dispatch(setFactoryList(factoryList)));
    };
};

// 用户信息
export const requestUserInfo = () => {
    return (dispatch) => {
        const promise = fetchAccountInfo();
        promise.then((userInfo) => {
            dispatch(setUserInfo(userInfo));
        });
    };
};
