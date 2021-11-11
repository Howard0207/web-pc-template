import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './router';
/* global env */
if (env === 'development') {
    window.env = 'development';
} else {
    window.env = 'production';
}
ReactDOM.render(<RouterConfig />, document.getElementById('app'));
