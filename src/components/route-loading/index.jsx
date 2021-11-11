/* eslint-disable no-multi-assign */
/* eslint-disable no-bitwise */
import React, { useEffect, useRef } from 'react';
import { Loading } from './Loading';

function RouteLoading() {
    const canContaner = useRef();
    useEffect(() => {
        const loading = new Loading({ container: canContaner.current });
        loading.init();
        return () => loading.stop();
    }, []);

    return <div ref={canContaner} className="route-loading"></div>;
}

export default RouteLoading;
