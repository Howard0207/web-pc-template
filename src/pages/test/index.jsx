import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import { ValidateSlide } from '_components';
import { fetchTest } from '_src/api';
import { errorCapture } from '_utils';

export default function () {
    const history = useHistory();

    function handleClick() {
        history.push('/factory-all');
    }

    const testApi = async () => {
        const [err, data] = await errorCapture(fetchTest, '/upload/test');
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    };

    return (
        <>
            <ValidateSlide />
            <img src="http://localhost:10100/validate/slide/1231" />
            <Result
                className="not-found"
                status="404"
                title="404"
                subTitle="这是一个测试页面testtest"
                extra={
                    <Button type="primary" onClick={handleClick}>
                        Back Home
                    </Button>
                }
            />
            <Button onClick={testApi}>测试api</Button>
        </>
    );
}
