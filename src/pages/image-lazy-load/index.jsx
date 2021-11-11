import React from 'react';
import { elementInViewport, throttle } from '_utils';
import img1 from '_static/imgs/1.jfif';
import img2 from '_static/imgs/2.jfif';
import img3 from '_static/imgs/3.jfif';
import img4 from '_static/imgs/4.jfif';
import img5 from '_static/imgs/5.jfif';
import img6 from '_static/imgs/6.jfif';
import '_less/image-lazy-load';

class ImageLazyLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { can: React.createRef('container') };
    }

    /**
     * 组件加载
     */
    componentDidMount() {
        this.initScroll();
    }

    /**
     * 组件卸载
     */
    componentWillUnmount() {
        this.removeScroll();
    }

    // 图片懒加载
    lazyLoadImgs = (images) => {
        return () => {
            images.forEach((image) => {
                const style = image.getAttribute('style');
                if (!style) {
                    if (elementInViewport(image)) {
                        const url = image.getAttribute('data-src');
                        const img = new Image();
                        img.onload = () => {
                            image.setAttribute('style', `background-image: url(${url})`);
                        };
                        img.onerror = () => {
                            // eslint-disable-next-line no-console
                            console.log(`%c 加载失败:${url}`, 'color: #ff6262');
                        };
                        img.src = url;
                    }
                } else {
                    const idx = images.findIndex((dom) => dom === image);
                    images.splice(idx, 1);
                }
            });
        };
    };

    // 解除滚动绑定
    removeScroll = () => {
        if (this.bindFunc) window.removeEventListener('scroll', this.bindFunc);
    };

    // 初始化滚动事件
    initScroll = () => {
        const { can } = this.state;
        const images = Array.from(can.current.querySelectorAll('.img-lazy'));
        this.bindFunc = throttle(this.lazyLoadImgs(images), 50, 100);
        window.addEventListener('scroll', this.bindFunc);
        this.bindFunc();
    };

    render() {
        const { can } = this.state;
        return (
            <div className="image-lazy-load" ref={can}>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img1}></div>
                    </div>
                </div>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img2}></div>
                    </div>
                </div>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img3}></div>
                    </div>
                </div>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img4}></div>
                    </div>
                </div>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img5}></div>
                    </div>
                </div>
                <div className="img-can">
                    <div className="img-wrap">
                        <div className="img-lazy" data-src={img6}></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default React.memo(ImageLazyLoad);
