import { Form, Input, Button, Checkbox } from 'antd';
import { regexAccount } from '_const';
import '_less/index.less';
import '_less/login';

const Login = () => {
    const onFinish = () => {
        alert('test');
    };

    return (
        <div className="login">
            <div className="login-bg"></div>
            <div className="login-wrapper">
                <div className="login__form">
                    <div className="login__form-title">LOGIN</div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名!' },
                                { pattern: regexAccount, message: '用户名错误' },
                            ]}
                            validateFirst
                        >
                            <Input
                                size="large"
                                prefix={<i className="iconfont icon-username"></i>}
                                placeholder="邮箱/手机号"
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} validateFirst>
                            <Input
                                size="large"
                                prefix={<i className="iconfont icon-password"></i>}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>
                        <Form.Item className="login__remember-forgot">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住账号</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            <div className="account-relative">
                                <a className="login-form-forgot" href="">
                                    忘记密码
                                </a>
                                <a href="">注册</a>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
