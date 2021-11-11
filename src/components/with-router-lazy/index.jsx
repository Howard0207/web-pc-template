import ErrorBoundary from '../error-boundary';
import React from 'react';
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
