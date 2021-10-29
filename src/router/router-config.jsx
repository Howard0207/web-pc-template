import { withRouterLazy, ProjectLoading, RouteLoading } from '_components';

const Main = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true */ /* webpackChunkName: "Test" */ /* webpackMode: "lazy" */ '../pages/main')
    ),
    ProjectLoading
);

const NotFound = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true */ /* webpackChunkName: "Test" */ /* webpackMode: "lazy" */ '../pages/404')
    ),
    ProjectLoading
);

const TestPage = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true  */ /* webpackChunkName: "Test" */ /* webpackMode: "lazy" */ '../pages/test')
    ),
    RouteLoading
);

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
