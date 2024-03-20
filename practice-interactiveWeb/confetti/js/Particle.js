import { randomNumBetween, hexToRgb } from './utils.js';

export default class Particle {
  constructor(x, y, deg = 0, colors) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(30, 100);

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = 0.89;
    this.gravity = 0.5;

    this.x = x * innerWidth;
    this.y = y * innerHeight;
    this.width = 12;
    this.height = 12;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotate = randomNumBetween(0, 360);
    this.rotateDelta = randomNumBetween(-1, 1);
    this.opacity = 1;

    this.colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0'];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]
    );
  }
  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.opacity -= 0.005;
    this.rotate += this.rotateDelta;
  }
  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2);

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );

    ctx.resetTransform();
  }
}
