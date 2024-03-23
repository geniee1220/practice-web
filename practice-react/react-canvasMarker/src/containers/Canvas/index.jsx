import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';

function Canvas() {
  const canvasRef = useRef(null);
  const markerRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });

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

      drawImage();
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

      // Draw marker
      if (markerRef.current) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(markerPosition.x, markerPosition.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    function handleCanvasClick(event) {
      const rect = canvas.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      let markerWidth = 10;
      let markerHeight = 10;

      setMarkerPosition({ x: mouseX, y: mouseY });
    }

    function handleMarkerDrag(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      setMarkerPosition({ x: mouseX, y: mouseY });
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleCanvasClick);

    preloadImages().then(() => drawImage());

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [markerPosition]);

  return (
    <S.CanvasContainer>
      <canvas ref={canvasRef}></canvas>
      <div
        ref={markerRef}
        style={{
          position: 'absolute',
          left: markerPosition.x,
          top: markerPosition.y,
          cursor: 'pointer',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          zIndex: 999,
        }}
        draggable
        onDrag={(event) => handleMarkerDrag(event)}
      ></div>
    </S.CanvasContainer>
  );
}

export default Canvas;
