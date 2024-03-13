const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

// 캔버스의 크기를 지정해주지 않으면 기본값으로 300 * 150으로 설정된다.
// 만약 css로 크기를 지정해주면, 캔버스 내부의 픽셀들은 늘어나지 않는다.
// 따라서 캔버스의 크기도 함께 지정해주어야 한다.
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// DPR이 2 이상이라면 더 높은 해상도의 캔버스를 그려준다.
console.log(window.devicePixelRatio);

const dpr = window.devicePixelRatio;
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

// ----- dat.GUI
const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

// 4가지 인자를 받는다.
// 첫번째 인자로 controls, 두번째 인자로 속성명, 세번째 인자로 최소값, 네번째 인자로 최대값
const f1 = gui.addFolder('Gooey Effect');
f1.open();
f1.add(controls, 'blurValue', 0, 100).onChange((v) => {
  feGaussianBlur.setAttribute('stdDeviation', v);
});
f1.add(controls, 'alphaChannel', 1, 200).onChange((v) => {
  feColorMatrix.setAttribute(
    'values',
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${v} ${controls.alphaOffset}`
  );
});
f1.add(controls, 'alphaOffset', -40, 40).onChange((v) => {
  feColorMatrix.setAttribute(
    'values',
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${v}`
  );
});
const f2 = gui.addFolder('Particle Property');

f2.open();
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange((v) => {
  particles.forEach((particle) => (particle.acc = v));
});

// ----- 1. 캔버스에 사각형 그리기
// x, y, width, height
// ctx.fillRect(10, 10, 50, 50);

// ----- 2. 캔버스에 원 그리기
// ctx.beginPath();
// // x, y, radius, startAngle, endAngle, anticlockwise
// // x, y, 반지름, 시작 각도, 끝 각도, 시계 반대 방향으로 그릴 것인지
// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);

// // ctx.fill(); // 채우기
// // ctx.fillStyle = 'red'; // 채우기 색상 변경
// ctx.stroke(); // 선만 그리기

// ctx.closePath();

// ----- 3. 캔버스에 파티클 그리기
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
const random = (min, max) => Math.random() * (max - min + 1) + min;

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = random(0, canvasWidth);
  const y = random(0, canvasHeight);
  const radius = random(50, 100);
  const vy = random(1, 5);
  const particle = new Particle(x, y, radius, vy);

  particles.push(particle);
}

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

// ----- 4. 캔버스에 파티클 애니메이션 그리기
// requestAnimationFrame을 사용하여 애니메이션을 그려준다. 재귀 호출을 통해 애니메이션을 그려준다.
function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  // 모든 프레임을 지우고 다시 그려준다.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = random(0, canvasWidth);
      particle.radius = random(50, 100);
      particle.vy = random(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();
