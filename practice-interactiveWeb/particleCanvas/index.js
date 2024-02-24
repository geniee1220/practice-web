const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

// 캔버스의 크기를 지정해주지 않으면 기본값으로 300 * 150으로 설정된다.
// 만약 css로 크기를 지정해주면, 캔버스 내부의 픽셀들은 늘어나지 않는다.
// 따라서 캔버스의 크기도 함께 지정해주어야 한다.
const canvasWidth = 300;
const canvasHeight = 300;

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

// x, y, width, height
ctx.fillRect(10, 10, 50, 50);
