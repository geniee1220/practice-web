import { useEffect, useRef } from 'react';
import * as S from './styles';

function Canvas() {
  const canvasRef = useRef(null);
  const markerPositionRef = useRef(null);
  const activeMarkerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    const imageSrcs = ['https://source.unsplash.com/random'];
    const loadedImages = [];
    let currIndex = 0;

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      preloadImages().then(() => drawImage());
    }

    function preloadImages() {
      return new Promise((resolve, reject) => {
        let loaded = 0;
        imageSrcs.forEach((src) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded += 1;
            loadedImages.push(img);
            if (loaded === imageSrcs.length) return resolve();
          };
        });
      });
    }

    function drawImage() {
      const image = loadedImages[currIndex];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      clearMarker();
      drawMarker(x, y);
      markerPositionRef.current = { x, y };
    }

    function handleMouseDown(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (markerPositionRef.current) {
        const { x: markerX, y: markerY } = markerPositionRef.current;
        const distance = Math.sqrt((x - markerX) ** 2 + (y - markerY) ** 2);
        if (distance <= 5) {
          activeMarkerRef.current = { x: markerX, y: markerY };
          canvas.addEventListener('mousemove', handleMouseMove);
          canvas.addEventListener('mouseup', handleMouseUp);
        }
      }
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (activeMarkerRef.current) {
        clearMarker();
        drawMarker(x, y);
        activeMarkerRef.current = { x, y };
      }
    }

    function handleMouseUp() {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      activeMarkerRef.current = null;
    }

    function clearMarker() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImage();
    }

    function drawMarker(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousedown', handleMouseDown);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <S.CanvasContainer>
      <canvas ref={canvasRef}></canvas>
    </S.CanvasContainer>
  );
}

export default Canvas;