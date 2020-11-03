import Loadable from 'react-loadable';
import Loading from '_components/loading';

const Main = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/main'),
    loading: Loading('loadable-loading__app'),
});

const NotFound = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/404'),
    loading: Loading('loadable-loading__page'),
});

const TestPage = Loadable({
    loader: () => import(/* webpackPrefetch: true */ '../pages/test'),
    loading: Loading('loadable-loading__page'),
});

const routes = [
    {
        path: '/',
        component: Main,
        routes: [
            {
                path: '/',
                exact: true,
                component: TestPage,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
    {
        path: '*',
        component: NotFound,
    },
];

export default routes;
