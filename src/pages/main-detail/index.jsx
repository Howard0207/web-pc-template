import React, { PureComponent } from 'react';
import { withRouter, Switch, Link } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { RouteWithSubRoutes, AvatarDropDown } from '_components';
import PropType from 'prop-types';
import defaultLogo from '_static/imgs/logo.png';

import '_less/main';

const { Content, Header } = Layout;

class Main extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            routes: props.routes,
        };
    }

    componentDidMount() {}

    render() {
        const { routes } = this.state;
        return (
            <Layout className="main">
                <Header className="main__header main__header--full-fill">
                    <Link to="/">
                        <img src={defaultLogo} alt="logo" className="main_header-detail-logo" />
                    </Link>
                    <Dropdown
                        overlay={AvatarDropDown}
                        placement="bottomCenter"
                        trigger="click"
                        overlayClassName="user-menu"
                    >
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
                    </Dropdown>
                </Header>
                <Content className="main__content main__content--full-fill">
                    <Switch>
                        {routes.map((route) => {
                            return <RouteWithSubRoutes key={route.path} {...route} />;
                        })}
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

Main.propTypes = {
    routes: PropType.array.isRequired,
};
export default withRouter(Main);
