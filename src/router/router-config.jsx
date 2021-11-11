import React from 'react';
import { withRouterLazy, ProjectLoading, RouteLoading } from '_components';

const Main = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true */ /* webpackChunkName: "Test" */ /* webpackMode: "lazy" */ '../pages/main')
    ),
    ProjectLoading
);

const NotFound = withRouterLazy(
    React.lazy(() => import(/* webpackPrefetch: true */ /* webpackChunkName: "NotFound" */ '../pages/404')),
    ProjectLoading
);

const TestPage = withRouterLazy(
    React.lazy(() => import(/* webpackPrefetch: true  */ /* webpackChunkName: "TestPage" */ '../pages/test')),
    RouteLoading
);

const ImageLazyLoad = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true */ /* webpackChunkName: "ImageLazyLoad" */ '../pages/image-lazy-load')
    ),
    RouteLoading
);

const CompareEffectApi = withRouterLazy(
    React.lazy(() => import(/* webpackPrefetch: true */ '../pages/useEffect&useLayoutEffect')),
    RouteLoading
);

const ImageUpload = withRouterLazy(
    React.lazy(() => import(/* webpackPrefetch: true */ '../pages/upload-image')),
    RouteLoading
);
const MainDetail = withRouterLazy(
    React.lazy(() =>
        import(/* webpackPrefetch: true */ /* webpackChunkName: "MainDetail    " */ '../pages/main-detail')
    ),
    ProjectLoading
);

const routes = [
    {
        path: '/detail',
        component: MainDetail,
        routes: [
            {
                path: '/detail/user-center',
                exact: true,
                component: NotFound,
            },
        ],
    },
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
                path: '/imglazyload',
                component: ImageLazyLoad,
                exact: true,
            },
            {
                path: '/imgupload',
                component: ImageUpload,
                exact: true,
            },
            {
                path: '/compareeffectapi',
                component: CompareEffectApi,
                exact: true,
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
