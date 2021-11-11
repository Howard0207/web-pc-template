import React from 'react';
import PropTypes from 'prop-types';
import '_less/components/section-title';
import { useHistory } from 'react-router';

const SectionTitle = (props) => {
    const { title, isShowArrow, className, link } = props;
    const newClassName = link ? `${className} section-title-link` : className;
    const history = useHistory();
    const routerGo = () => {
        if (link) {
            history.push(link);
        }
    };
    return (
        <div className={`section-title ${newClassName}`} onClick={routerGo}>
            <span className="title-bar"></span>
            <span className="title-text">{title}</span>
            {isShowArrow && <i className="iconfont icon-arrowLine"></i>}
        </div>
    );
};
SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isShowArrow: PropTypes.bool,
    className: PropTypes.string,
    link: PropTypes.string,
};

SectionTitle.defaultProps = {
    isShowArrow: true,
    className: '',
    link: '',
};
export default SectionTitle;
