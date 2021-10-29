import React, { PureComponent } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { Button, Checkbox, Layout } from 'antd';
import { RouteWithSubRoutes } from '_components';
import PropType from 'prop-types';
import defaultLogo from '_static/imgs/logo.png';
import { loadCss } from '_utils';
import { SiderMenu, Header } from './components';
import '_less/main';

const { Content, Sider } = Layout;

class Main extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            routes: props.routes,
            theme: 'theme1',
        };
    }

    changeTheme = (theme) => {
        switch (theme) {
            case 'theme1':
                loadCss('//cdn.ucyber.cn/common/theme1.css?name=123').then((res) => {
                    this.setState({ theme: 'theme1' });
                    console.log(res);
                });
                break;
            case 'theme2':
                loadCss('//cdn.ucyber.cn/common/theme2.css?name=123').then((res) => {
                    this.setState({ theme: 'theme2' });
                    console.log(res);
                });
                break;
            default:
        }
    };

    componentDidMount() {}

    render() {
        const { routes, theme } = this.state;
        return (
            <Layout theme="light" className="main">
                <Sider theme="light" width={256} collapsedWidth="0" className="main__sider">
                    <div className="main__menu-container">
                        <div className="main__logo">
                            <img src={defaultLogo} alt="logo" />
                            <p>X X X X 平 台</p>
                        </div>
                        <SiderMenu />
                    </div>
                    <footer className="theme">
                        <div>主题选择：</div>
                        <div className="theme-options">
                            <span className="geekblue" onClick={() => this.changeTheme('theme1')}>
                                {theme === 'theme1' ? '√' : null}
                            </span>
                            <span className="green" onClick={() => this.changeTheme('theme2')}>
                                {theme === 'theme2' ? '√' : null}
                            </span>
                        </div>
                    </footer>
                    <div className="copyright">
                        <p>粤ICP备19005988号</p>
                        <p>Copyright © 2019-2020 清科优能</p>
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <Header />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Switch>
                            {routes.map((route) => {
                                return <RouteWithSubRoutes key={route.path} {...route} />;
                            })}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

// Main.propTypes = {
//     routes: PropType.array.isRequired,
// };
export default withRouter(Main);
