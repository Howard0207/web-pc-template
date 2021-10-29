import ErrorBoundary from '../error-boundary';

const { Suspense } = React;

const withRouterLazy = (LazyComponent, LoadingComponent) =>
    class WrapComponent extends React.PureComponent {
        render() {
            return (
                <ErrorBoundary>
                    <Suspense fallback={<LoadingComponent />}>
                        <LazyComponent {...this.props} />
                    </Suspense>
                </ErrorBoundary>
            );
        }
    };

export default withRouterLazy;
