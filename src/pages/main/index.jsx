import React, { PureComponent } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { RouteWithSubRoutes, AvatarDropDown } from '_components';
import PropType from 'prop-types';
import defaultLogo from '_static/imgs/logo.png';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import SiderMenu from './components/SiderMenu';
import { loadCss } from '_utils';

import '_less/main';

const { Content, Sider, Header } = Layout;

class Main extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            routes: props.routes,
            collapsed: false,
        };
    }

    toggle = () => {
        const { collapsed } = this.state;
        this.setState({
            collapsed: !collapsed,
        });
    };

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
        const { routes, collapsed } = this.state;
        return (
            <Layout theme="light" className="main">
                <Sider
                    theme="light"
                    width={256}
                    className="main__sider"
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                >
                    <div className="main__menu-container">
                        <div className="main__logo">
                            <img src={defaultLogo} alt="logo" />
                        </div>
                        <SiderMenu />
                    </div>
                    <div className="copyright">
                        <p>粤ICP备19005988号</p>
                        <p>Copyright © 2019-2020 清科优能</p>
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <Header className={classNames('main__header', { 'main__header--collapsed': collapsed })}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Dropdown
                            overlay={AvatarDropDown}
                            placement="bottomCenter"
                            trigger="click"
                            overlayClassName="user-menu"
                        >
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                size="large"
                            />
                        </Dropdown>
                    </Header>
                    <Content className={classNames('main__content', { 'main__content--collapsed': collapsed })}>
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

Main.propTypes = {
    routes: PropType.array.isRequired,
};
export default withRouter(Main);
