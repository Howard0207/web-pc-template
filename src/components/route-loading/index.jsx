/* eslint-disable no-multi-assign */
/* eslint-disable no-bitwise */
import React, { useEffect, useRef } from 'react';
import { Loading } from './Loading';

function RouteLoading() {
    const canContaner = useRef();
    useEffect(() => {
        const loading = new Loading({ container: canContaner.current });
        let timer = setTimeout(() => loading.init(), 200);
        return () => {
            clearTimeout(timer);
            loading.stop();
        };
    }, []);
    return <div ref={canContaner} className="route-loading"></div>;
}

export default RouteLoading;
