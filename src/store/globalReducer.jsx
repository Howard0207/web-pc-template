import * as constants from './globalContant';

const defaultState = {
    factoryList: [],
    factoryLogo: null,
    selectedFactory: null,
    currentFactory: {},
    monitorPoints: [],
    monitorInlines: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_FACTORY_LIST:
            return { ...state, factoryList: action.data };
        case constants.CHANGE_FACTORY_LOGO:
            return state.set('factoryLogo', action.logo);
        case constants.CHANGE_CURRENTFACTORY:
            return { ...state, currentFactory: action.data };
        case constants.CHANTE_MONITORPOINTS:
            return { ...state, monitorPoints: action.data };
        case constants.CHANTE_MONITORINLINES:
            return { ...state, monitorInlines: action.data };
        default:
            return state;
    }
};
