import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

export default function () {
    const history = useHistory();

    function handleClick() {
        history.push('/factory-all');
    }

    return (
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
    );
}
