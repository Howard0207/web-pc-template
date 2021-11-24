import { Spin } from 'antd';
import React from 'react';
import '_less/validate-slide';
class ValidateSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: React.createRef('bg'),
            block: React.createRef('block'),
            slideblock: React.createRef('slideblock'),
            slideContainer: React.createRef('slideContainer'),
            originXRef: React.createRef('originXRef'),
            tipContainer: React.createRef('tipContainer'),
            isMouseMove: React.createRef('isMouseMove'),
            refreshContainer: React.createRef('refreshContainer'),
            loading: true,
            ctx: null,
            blockCtx: null,
            width: 300,
            l: 40,
            r: 8,
            result: false,
            sliderClass: 'slide-block',
        };
    }

    createImgAddress = () => {
        return `https://picsum.photos//300/200/?image=${Math.floor(Math.random() * 1000)}`;
    };

    getResult() {
        return this.state.result;
    }

    drawPath = (ctx, x, y, operation) => {
        const { l, r } = this.state;
        let PI = Math.PI;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
        ctx.lineTo(x + l, y);
        ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
        ctx.lineTo(x + l, y + l);
        ctx.lineTo(x, y + l);
        // anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向
        ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
        ctx.lineTo(x, y);
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        ctx.globalCompositeOperation = 'destination-over';
        // 判断是填充还是裁切, 裁切主要用于生成图案滑块
        operation === 'fill' ? ctx.fill() : ctx.clip();
    };

    initContainer = () => {
        const { ctx, block, loading } = this.state;
        block.current.removeAttribute('width');
        block.current.removeAttribute('style');
        var img = new Image();
        img.crossOrigin = '';
        img.onload = () => {
            this.drawPath(ctx, 100, 50, 'fill');
            ctx.drawImage(img, 0, 0, 300, 200);
            this.drawBlock(img);
            this.setState({ loading: false });
        };
        img.onerror = this.initContainer;
        img.src = this.createImgAddress();
    };

    drawBlock = (img) => {
        const { r, l, block, blockCtx } = this.state;
        const L = l + 2 * r;
        this.drawPath(blockCtx, 100, 50, 'clip');
        blockCtx.drawImage(img, 0, 0, 300, 200);
        const y1 = 50 - r * 2 + 1;
        const ImageData = blockCtx.getImageData(99, y1, L, L);
        window.ImageData = ImageData;
        // 调整滑块画布宽度
        block.current.width = L;
        blockCtx.putImageData(ImageData, 0, y1);
    };

    reset = () => {
        const { tipContainer, slideblock, isMouseMove, l, r, ctx } = this.state;
        this.setState({ sliderClass: 'slide-block', loading: true }, () => {
            tipContainer.current.textContent = '向右拖动滑块填充拼图';
            slideblock.current.style.width = l + r * 2 + 'px';
            isMouseMove.current = false;
            ctx.clearRect(0, 0, 300, 200);
            this.initContainer();
        });
    };

    verify = (position) => {
        return position - 100 > -5 && position - 100 < 5;
    };

    handleDragMove = (e) => {
        const { slideblock, originXRef, block, isMouseMove, tipContainer } = this.state;
        const { width, l, r } = this.state;
        const L = l + 2 * r;
        e.preventDefault();
        if (!isMouseMove.current) {
            isMouseMove.current = true;
            tipContainer.current.textContent = '';
        }
        const eventX = e.clientX || e.touches[0].clientX;
        const moveX = eventX - originXRef.current;
        if (moveX < 0 || moveX + L >= width) return false;
        slideblock.current.style.width = moveX + L + 'px';
        block.current.style.left = moveX + 'px';
    };

    handleDragEnd = (e) => {
        const { slideblock, originXRef, refreshContainer } = this.state;
        slideblock.current.removeEventListener('mousemove', this.handleDragMove);
        slideblock.current.removeEventListener('mouseup', this.handleDragEnd);
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX === originXRef.current) return false;
        const flag = this.verify(eventX - originXRef.current);
        this.setState({ result: flag });
        if (flag) {
            this.setState({ sliderClass: 'slide-block sliderContainer_success' });
            refreshContainer.current.remove();
            slideblock.current.removeEventListener('mousedown', this.handleMouseDown);
        } else {
            // 验证失败, 刷新重置
            this.setState({ sliderClass: 'slide-block sliderContainer_fail' });
            setTimeout(() => {
                this.reset();
            }, 1000);
        }
    };

    handleMouseDown = (e) => {
        const { slideblock, originXRef } = this.state;
        originXRef.current = e.clientX || e.touches[0].clientX;
        slideblock.current.addEventListener('mousemove', this.handleDragMove);
        slideblock.current.addEventListener('mouseup', this.handleDragEnd);
    };

    componentDidMount() {
        const { slideblock, bg, block } = this.state;
        const ctx = bg.current.getContext('2d');
        const blockCtx = block.current.getContext('2d');
        this.setState({ ctx, blockCtx }, () => {
            this.initContainer();
            slideblock.current.addEventListener('mousedown', this.handleMouseDown);
        });
    }

    componentWillUnmount() {
        const { slideblock } = this.state;
        slideblock.current.removeEventListener('mousedown', this.handleMouseDown);
    }

    render() {
        const { bg, block, slideblock, slideContainer, sliderClass, tipContainer, refreshContainer, loading } =
            this.state;
        return (
            <div className="validate-slide">
                <Spin spinning={loading} delay={200} className="validate-slide">
                    <canvas ref={bg}></canvas>
                    <canvas ref={block}></canvas>
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
