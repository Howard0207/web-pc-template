import * as constant from './globalContant';

const defaultState = {
    factoryList: [],
    factoryLogo: null,
    currentFactory: {},
    userInfo: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case constant.CHANGE_FACTORY_LIST:
            return { ...state, factoryList: action.data };
        case constant.CHANGE_FACTORY_LOGO:
            return state.set('factoryLogo', action.logo);
        case constant.CHANGE_CURRENTFACTORY:
            return { ...state, currentFactory: action.data };
        case constant.CHANGE_USERINFO:
            return { ...state, userInfo: action.data };
        default:
            return state;
    }
};
