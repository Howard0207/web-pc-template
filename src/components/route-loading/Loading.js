/* eslint-disable no-bitwise */
/* eslint-disable max-classes-per-file */
class Particle {
    constructor(props) {
        const { x, y, angle, speed, accel, ctx } = props;
        this.radius = 7;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.accel = accel;
        this.decay = 0.01;
        this.life = 1;
        this.PI = Math.PI;
        this.TWO_PI = this.PI * 2;
        this.ctx = ctx;
    }

    step = (i, particles) => {
        this.speed += this.accel;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += this.PI / 64;
        this.accel *= 1.01;
        this.life -= this.decay;

        if (this.life <= 0) {
            particles.splice(i, 1);
        }
    };

    draw = (i, tick, particles) => {
        const ctxStyle = `hsla(${tick + this.life * 120}, 100%, 60%, ${this.life})`;
        this.ctx.fillStyle = ctxStyle;
        this.ctx.strokeStyle = ctxStyle;
        this.ctx.beginPath();
        if (particles[i - 1]) {
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(particles[i - 1].x, particles[i - 1].y);
        }
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, this.TWO_PI);
        this.ctx.fill();

        const size = Math.random() * 1.25;
        this.ctx.fillRect(
            ~~(this.x + (Math.random() - 0.5) * 35 * this.life),
            ~~(this.y + (Math.random() - 0.5) * 35 * this.life),
            size,
            size
        );
    };
}

class Loading {
    constructor({ container }) {
        this.width = 300;
        this.height = 300;
        this.min = this.width * 0.5;
        this.particles = [];
        this.globalAngle = 0;
        this.globalRotation = 0;
        this.tick = 0;
        this.PI = Math.PI;
        this.TWO_PI = this.PI * 2;
        this.canvas = null;
        this.ctx = null;
        this.isRunning = true;
        this.container = container;
    }

    step = () => {
        this.particles.push(
            new Particle({
                ctx: this.ctx,
                x: this.width / 2 + (Math.cos(this.tick / 20) * this.min) / 2,
                y: this.height / 2 + (Math.sin(this.tick / 20) * this.min) / 2,
                angle: this.globalRotation + this.globalAngle,
                speed: 0,
                accel: 0.01,
            })
        );
        this.particles.forEach((elem, index) => elem.step(index, this.particles));
        this.globalRotation += this.PI / 6;
        this.globalAngle += this.PI / 6;
    };

    draw = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.particles.forEach((elem, index) => elem.draw(index, this.tick, this.particles));
    };

    init = () => {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.globalAlpha = 1;
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.ctx.globalCompositeOperation = 'lighter';
        this.container.appendChild(this.canvas);
        this.loop();
    };

    stop = () => {
        this.isRunning = false;
    };

    loop = () => {
        if (this.isRunning) {
            requestAnimationFrame(this.loop);
        }
        this.step();
        this.draw();
        this.tick++;
    };
}

export { Loading, Particle };
