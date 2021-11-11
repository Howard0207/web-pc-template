import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import '_less/usercenter';

class UserCenter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <div></div>;
    }
}
UserCenter.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};
export default withRouter();
