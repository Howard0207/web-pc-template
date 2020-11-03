import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { RouteWithSubRoutes } from '_components';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import store from '../store';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '_less/index.less';
import routes from './router-config';

setConfig({ showReactDomPatchNotification: false });

function RouterConfig() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <Switch>
                        {routes.map((route) => {
                            return <RouteWithSubRoutes key={route.path} {...route} />;
                        })}
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    );
}

export default hot(RouterConfig);
