import { message, Spin } from 'antd';
import React from 'react';
import { errorCapture } from '_utils';
import { verifySlideCode } from '_src/api';
import '_less/validate-slide';
class ValidateSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: React.createRef('bg'), // 指向背景canvas
            block: React.createRef('block'), // 指向滑块canvas
            ctx: null, // 背景canvas的ctx
            blockCtx: null, // 滑块canvas的ctx
            slideblock: React.createRef('slideblock'), // 指向滑块
            slideContainer: React.createRef('slideContainer'), // 指向包裹滑块容器
            tipContainer: React.createRef('tipContainer'), // 指向提示信息容器
            originXRef: React.createRef('originXRef'), // 用于记录鼠标按下位置
            isMouseMove: React.createRef('isMouseMove'), // 判定是否在move事件中
            refreshContainer: React.createRef('refreshContainer'), // 指向刷新按钮
            loading: true, // 图片加载的loading
            isLock: false, // 是否锁定滑块
            width: 300, // 背景宽度
            blockWidth: 56, // 滑块大小 （滑块是个正方体）
            result: false, // 当前验证的结果
            sliderClass: 'slide-block', // 滑块的样式
            id: Math.ceil(Math.random() * 1000) + Date.now(), // 当前上下文的唯一id，获取图片的时候需要携带，验证的时候也需要携带
        };
    }

    // 绑定事件（这里可以用节流，时间可以短一点），初始化context
    componentDidMount() {
        const { slideblock, bg, block } = this.state;
        const ctx = bg.current.getContext('2d');
        const blockCtx = block.current.getContext('2d');
        this.setState({ ctx, blockCtx }, () => {
            this.initContainer();
            slideblock.current.addEventListener('mousedown', this.handleMouseDown);
        });
    }

    // 解绑事件
    componentWillUnmount() {
        const { slideblock } = this.state;
        slideblock.current.removeEventListener('mousedown', this.handleMouseDown);
    }

    // 创建生成图片地址
    createImgAddress = () => `http://localhost:10100/validate/slide/${this.state.id}`;

    // 获取当前滑块结果
    getResult = () => this.state.result;

    // 初始化滑块容器背景， 滑块图片
    initContainer = () => {
        const { ctx, blockCtx } = this.state;
        var img = new Image();
        img.crossOrigin = '';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 356;
            canvas.height = 200;
            const can = canvas.getContext('2d');
            can.drawImage(img, 0, 0, 356, 200);
            const slideBgImgData = can.getImageData(0, 0, 300, 200);
            const slideBlImgData = can.getImageData(300, 0, 56, 200);
            ctx.putImageData(slideBgImgData, 0, 0);
            blockCtx.putImageData(slideBlImgData, 0, 0);
            this.setState({ loading: false, isLock: false });
        };
        img.onerror = this.initContainer;
        img.src = this.createImgAddress();
    };

    // 滑块重置
    reset = () => {
        const { tipContainer, block, blockCtx, isMouseMove, ctx } = this.state;
        block.current.removeAttribute('style');
        this.setState({ sliderClass: 'slide-block', loading: true }, () => {
            tipContainer.current.textContent = '向右拖动滑块填充拼图';
            isMouseMove.current = false;
            // 清除画板
            ctx.clearRect(0, 0, 300, 200);
            blockCtx.clearRect(0, 0, 300, 200);
            this.initContainer();
        });
    };

    // 验证是否成功 （可以通过外部处理）
    verify = async (position) => {
        const { refreshContainer, id, slideblock } = this.state;
        const [err, data] = await errorCapture(verifySlideCode, { id, position });
        if (err) {
            this.setState({ sliderClass: 'slide-block sliderContainer_fail' });
            setTimeout(() => this.reset(), 1000);
            message.error('验证失败');
        } else {
            this.setState({ result: true, sliderClass: 'slide-block sliderContainer_success' });
            console.log(data);
            refreshContainer.current.remove();
            slideblock.current.removeEventListener('mousedown', this.handleMouseDown);
        }
    };

    // 拖动事件处理
    handleDragMove = (e) => {
        e.preventDefault();
        const { slideblock, originXRef, block, isMouseMove, tipContainer } = this.state;
        const { width, blockWidth } = this.state;
        // 清除tips中的文字
        if (!isMouseMove.current) {
            isMouseMove.current = true;
            tipContainer.current.textContent = '';
        }
        // 获取鼠标坐标
        const eventX = e.clientX || e.touches[0].clientX;
        const moveX = eventX - originXRef.current;
        // 滑块越界判定
        if (moveX < 0 || moveX + blockWidth >= width) return false;
        // 滑块样式设置
        slideblock.current.style.width = moveX + blockWidth + 'px';
        block.current.style.left = moveX + 'px';
    };

    // 鼠标抬起事件处理
    handleDragEnd = (e) => {
        const { slideblock, originXRef } = this.state;
        // 解绑事件
        slideblock.current.removeEventListener('mousemove', this.handleDragMove);
        slideblock.current.removeEventListener('mouseup', this.handleDragEnd);
        // 坐标获取
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX === originXRef.current) return false;
        // 滑块锁定
        this.setState({ isLock: true });
        // 验证
        this.verify(eventX - originXRef.current);
    };

    // 鼠标按下事件处理
    handleMouseDown = (e) => {
        const { isLock } = this.state;
        if (isLock) return;
        const { slideblock, originXRef } = this.state;
        // 记录初始坐标
        originXRef.current = e.clientX || e.touches[0].clientX;
        // 添加事件
        slideblock.current.addEventListener('mousemove', this.handleDragMove);
        slideblock.current.addEventListener('mouseup', this.handleDragEnd);
    };

    render() {
        const { bg, block, slideblock, slideContainer, sliderClass, tipContainer, refreshContainer, loading } =
            this.state;
        return (
            <div className="validate-slide">
                <Spin spinning={loading} delay={200} className="validate-slide">
                    <canvas ref={bg} width={300} height={200}></canvas>
                    <canvas ref={block} width={300} height={200}></canvas>
                    <i className="iconfont icon-reset" ref={refreshContainer} onClick={this.reset}></i>
                </Spin>
                <div className="slide-container" ref={slideContainer}>
                    <span ref={tipContainer}>向右拖动滑块填充拼图</span>
                    <div ref={slideblock} className={sliderClass}></div>
                </div>
            </div>
        );
    }
}
export default React.memo(ValidateSlide);
