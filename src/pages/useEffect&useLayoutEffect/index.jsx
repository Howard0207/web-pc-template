import React, { useEffect, useLayoutEffect, useState } from 'react';

function CompareEffectApi() {
    const [state, setState] = useState('hello world');

    // useEffect(() => {
    //     let i = 0;
    //     while (i <= 1000000000) {
    //         i++;
    //     }
    //     setState('world hello');
    // }, []);

    useLayoutEffect(() => {
        let i = 0;
        while (i <= 1000000000) {
            i++;
        }
        setState('world hello');
    }, []);

    return (
        <>
            <div>{state}</div>
        </>
    );
}
export default React.memo(CompareEffectApi);
