import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import errorImg from '_static/imgs/error.png';
import '_less/components/pageError';

function ErrorInfo(props) {
    const { errorInfo } = props;
    const { title } = errorInfo;

    return (
        <div className="errorInfo">
            <img className="errorImg" src={errorImg} alt="error" />
            <div className="title">{title}</div>
        </div>
    );
}

ErrorInfo.propTypes = {
    errorInfo: PropTypes.object.isRequired,
};

export default withRouter(ErrorInfo);
