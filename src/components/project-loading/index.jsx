import React from 'react';
import ReactDOM from 'react-dom';
import '_less/components/project-loading';

const ProjectLoading = () => {
    return ReactDOM.createPortal(
        <div className="project-loading-mask">
            <div className="project-loading">
                <div className="gearbox">
                    <div className="overlay"></div>
                    <div className="gear one">
                        <div className="gear-inner">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div className="gear two">
                        <div className="gear-inner">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div className="gear three">
                        <div className="gear-inner">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div className="gear four large">
                        <div className="gear-inner">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                </div>
                <h1>Loading...</h1>
            </div>
        </div>,
        document.body
    );
};

export default React.memo(ProjectLoading);
