import PropTypes from 'prop-types';
import PageError from '../pageError';

class ErrorBoundary extends React.PureComponent {
    constructor() {
        super();
        this.state = { hasError: false, error: null };
    }

    // 接收error info
    static getDerivedStateFromError = () => {
        return {
            hasError: true,
        };
    };

    // 打印log信息
    componentDidCatch(_, errorInfo) {
        this.setState({ error: JSON.stringify(errorInfo) });
    }

    render() {
        const { hasError, error } = this.state;
        const { comp, children } = this.props;
        if (hasError) {
            if (comp) {
                return comp;
            }
            const errorInfo = { title: '页面加载异常', description: error };
            return <PageError errorInfo={errorInfo} />;
        }
        return children;
    }
}

ErrorBoundary.defaultProps = {
    comp: null,
};

ErrorBoundary.propTypes = {
    comp: PropTypes.object,
    children: PropTypes.object.isRequired,
};
export default ErrorBoundary;
