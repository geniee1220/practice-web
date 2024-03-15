import CanvasOptions from './js/CanvasOption';

class Canvas extends CanvasOptions {
  constructor() {
    // 부모 클래스의 생성자를 호출하기 위해 super()를 호출한다.
    super();
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px';
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});
