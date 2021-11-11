import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '_less/components/layer';
import { addEvent, removeEvent } from '_utils';
/**
 * Layer组件
 *
 * @param [title] 标题
 * @param [width] 窗口宽
 * @param [height] 窗口高
 * @param [className] 窗口类名
 * @param [closeCallBack] 关闭回调
 * @param [confirm] 确定按钮文本，默认为空即不显示；
 * @param [confirmBack] 点击确定按钮后执行的函数，仅当confirm不为空时才会触发回调confirmback函数；当回调为空时，点击确定后默认关闭窗口；
 * @param [openCallBack] 窗口加载完时执行的函数
 * @param [move] 允许窗口拖动，默认为true；
 * @param [maskLayer] 显示遮罩层
 * @param [shadeClose] 默认为false;点击遮罩关闭 false不关闭
 * @param [overflow] 垂直方向是否显示滚动条，默认false
 * @param [animation] 弹出层css3动画效果，仅在支持的浏览器，默认为1。动画序号对应animation样式的layer-anim-*
 *
 * 示例:
 *
 *     @example
 *      <Layer ref="layer" title=""/>content</Layer>
 * */

class Layer extends React.Component {
    constructor(props) {
        super(props);
        const { display, width, height, animation, isShowFullScreen } = props;
        const docEle = document.createElement('div');
        document.body.appendChild(docEle);
        this.state = {
            display,
            width,
            height,
            animation,
            left: '',
            top: '',
            docEle,
            contentHeight: '', // 内容区域高
            layerShowing: false, // layer 是否弹出
            isFullScreen: false,
            isShowFullScreen,
        };
        this.ucslayer = React.createRef();
        this.layerHeader = React.createRef();
    }

    componentDidMount() {
        addEvent(window, 'resize', this._handleResize);
        addEvent(window, 'scroll', this._handleScroll);
    }

    componentWillUnmount() {
        removeEvent(window, 'resize', this._handleResize);
        removeEvent(document, 'mousemove', this._handleMouseMove);
        removeEvent(document, 'mouseup', this._handleMouseUp);
        addEvent(window, 'scroll', this._handleScroll);
    }

    /**
     * layer 打开
     */
    layerOpen = () => {
        const { layerShowing } = this.state;
        const { animation, maskLayer, openCallBack } = this.props;
        if (layerShowing) {
            return;
        }
        // 添加遮罩层
        if (maskLayer) {
            this._maskLayer();
        }
        this.setState({ display: 'block', height: '', animation, layerShowing: true }, () => {
            this._setPosition();
            // 窗口加载完回调
            if (openCallBack) {
                openCallBack();
            }
        });
    };

    /**
     * Layer关闭
     */
    layerClose = () => {
        const { layerShowing, isFullScreen } = this.state;
        const { shadeClose } = this.props;
        if (!layerShowing) {
            return;
        }
        // 关闭窗口同时清除窗口高度，第二次弹出时有可能内容已动态的改变了
        this.setState({ layerShowing: false, display: false, animation: '', height: '', contentHeight: '' });
        // 移除遮罩层
        document.body.removeChild(this.divEL);
        if (shadeClose) {
            removeEvent(this.divEL, 'click', this._handleCloseClick);
        }
        if (isFullScreen) {
            this._handleFullScreen();
        }
    };

    /**
     * 阻止浏览器默认滚动事件
     */
    _handleScroll = (e) => {
        e.preventDefault();
    };

    /**
     * 浏览器resize事件处理
     */
    _handleResize = () => {
        const { display } = this.state;
        if (display === 'block') {
            this._setPosition();
        }
    };

    /**
     * 创建layer mask
     */
    _maskLayer = () => {
        const { shadeClose } = this.props;
        this.divEL = document.createElement('div');
        this.divEL.className = 'layer-mask';
        document.body.appendChild(this.divEL);
        if (shadeClose) {
            addEvent(this.divEL, 'click', this._handleCloseClick);
        }
    };

    /**
     * 获取弹窗宽度
     */
    _getLayerWidth = () => {
        const { width, isFullScreen } = this.state;
        if (isFullScreen) {
            return this.windowWidth;
        }
        return width || this.ucslayer.current.offsetWidth;
    };

    /**
     * 获取弹窗高度
     */
    _getLayerHeight = () => {
        const { isFullScreen } = this.state;
        if (isFullScreen) {
            return this.windowHeight;
        }
        return this.ucslayer.current.offsetHeight;
    };

    /**
     * 设置弹窗位置
     */
    _setPosition = () => {
        const { title } = this.props;
        // 浏览器窗口宽高兼容写法
        this.windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // 如果设定了高宽，则使用设定的
        this.layerWidth = this._getLayerWidth();
        this.layerHeight = this._getLayerHeight();
        this.layerHeight = this.layerHeight > this.windowHeight ? this.windowHeight : this.layerHeight; // 如果弹层高度大于浏览器窗口高，则使用浏览器窗口高
        const scrollTop = 0; // 滚动条的高度
        const left = (parseInt(this.windowWidth, 10) - parseInt(this.layerWidth, 10)) / 2;
        const top = (parseInt(this.windowHeight, 10) - parseInt(this.layerHeight, 10)) / 2 + scrollTop;
        // 如果不显示标题时会报错，这里加个判断
        const layerHeaderHeight = title ? parseInt(this.layerHeader.current.offsetHeight, 10) : 0;
        this.setState({
            width: this.layerWidth,
            height: this.layerHeight,
            left,
            top: top < 0 ? 0 : top,
            contentHeight: parseInt(this.layerHeight, 10) - layerHeaderHeight,
        });
    };

    /**
     * 点击全屏事件
     */
    _handleFullScreen = () => {
        const { width } = this.props;
        const { isFullScreen } = this.state;
        if (!isFullScreen) {
            this.layerWidth = this.windowWidth;
            this.layerHeight = this.windowHeight;
            this.setState({
                width: this.layerWidth,
                height: this.layerHeight,
                isFullScreen: !isFullScreen,
                top: 0,
                left: 0,
            });
        } else {
            this.layerWidth = width;
            this.setState({ width, height: '', isFullScreen: !isFullScreen }, this._setPosition);
        }
    };

    /**
     * 点击关闭按钮事件
     */
    _handleCloseClick = () => {
        const { closeCallBack } = this.props;
        this.layerClose();
        if (closeCallBack) {
            closeCallBack();
        }
    };

    /**
     * layer header鼠标按下事件
     */
    _handleMousedown = (e) => {
        const { move } = this.props;
        const { left, top } = this.state;
        if (move) {
            this.mx = e.pageX - parseInt(left, 10);
            this.my = e.pageY - parseInt(top, 10);
            this.move = true;
            addEvent(document, 'mousemove', this._handleMouseMove);
            addEvent(document, 'mouseup', this._handleMouseUp);
        }
    };

    /**
     * layer header鼠标按住拖动事件
     */
    _handleMouseMove = (e) => {
        if (this.move) {
            let x = e.pageX - parseInt(this.mx, 10);
            let y = e.pageY - parseInt(this.my, 10);
            const documentHeight = document.documentElement.clientHeight;
            if (x <= 0) {
                x = 0;
            } else if (
                x > parseInt(this.windowWidth, 10) - parseInt(this.layerWidth, 10) ||
                parseInt(this.windowWidth, 10) === parseInt(this.layerWidth, 10)
            ) {
                // window窗口宽－弹层宽
                x = parseInt(this.windowWidth, 10) - parseInt(this.layerWidth, 10);
            }
            if (y <= 0) {
                y = 0;
            } else if (y > documentHeight - parseInt(this.layerHeight, 10)) {
                y = documentHeight - parseInt(this.layerHeight, 10);
            }
            this.setState({
                left: x,
                top: y,
            });
            return false;
        }
        return true;
    };

    /**
     * layer header鼠标抬起事件
     */
    _handleMouseUp = () => {
        this.move = false;
        removeEvent(document, 'mousemove', this._handleMouseMove);
        removeEvent(document, 'mouseup', this._handleMouseUp);
    };

    render() {
        const { width, height, isFullScreen, display, left, top, contentHeight, animation, docEle, isShowFullScreen } =
            this.state;
        const { children, overflow, className, id, title, move } = this.props;
        const style = {
            width,
            // eslint-disable-next-line react/destructuring-assignment
            maxHeight: isFullScreen ? height : this.props.height,
            left,
            top,
            display: display ? 'block' : 'none',
        };
        const bodyClass = 'layer-body';
        const bodyContent = children;
        const moveStyle = { cursor: move ? 'move' : 'default' };
        let layerContentHeight = {};
        if (overflow) {
            layerContentHeight = { height: contentHeight };
        }
        if (isFullScreen) {
            style.height = height;
        }

        return ReactDOM.createPortal(
            <div className={`layer ${className} ${animation}`} style={style} ref={this.ucslayer} id={id}>
                {isShowFullScreen && (
                    <span className="layer-fullscreen" onClick={this._handleFullScreen}>
                        全屏
                    </span>
                )}
                <i className="layer-close" onClick={this._handleCloseClick}>
                    X
                </i>
                {title && (
                    <div
                        className="layer-header"
                        onMouseDown={this._handleMousedown}
                        ref={this.layerHeader}
                        style={moveStyle}
                    >
                        {title}
                    </div>
                )}
                <div className="layer-content" style={layerContentHeight}>
                    <div className={bodyClass}>{bodyContent}</div>
                </div>
            </div>,
            docEle
        );
    }
}

Layer.defaultProps = {
    title: '',
    display: false,
    width: '',
    height: '',
    className: '',
    animation: 'layer-animate',
    openCallBack: false,
    closeCallBack: false,
    maskLayer: true,
    shadeClose: true,
    overflow: false,
    move: true,
    id: '',
    isShowFullScreen: false,
};
Layer.propTypes = {
    children: PropTypes.array.isRequired,
    title: PropTypes.string,
    display: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    animation: PropTypes.string,
    maskLayer: PropTypes.bool,
    openCallBack: PropTypes.bool,
    closeCallBack: PropTypes.bool,
    shadeClose: PropTypes.bool,
    overflow: PropTypes.bool,
    move: PropTypes.bool,
    id: PropTypes.string,
    isShowFullScreen: PropTypes.bool,
};
export default Layer;
