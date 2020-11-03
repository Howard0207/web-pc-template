import * as constant from './globalContant';

export const setFactoryList = (factoryList) => {
    return {
        type: constant.CHANGE_FACTORY_LIST,
        data: factoryList,
    };
};

export const setCurrentFactory = (factory) => {
    return {
        type: constant.CHANGE_CURRENTFACTORY,
        data: factory,
    };
};

export const setMonitorPoints = (points) => {
    return {
        type: constant.CHANTE_MONITORPOINTS,
        data: points,
    };
};

export const setMonitorInlines = (inlines) => {
    return {
        type: constant.CHANTE_MONITORINLINES,
        data: inlines,
    };
};
