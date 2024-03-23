import { useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';

import * as S from './styles';
import Marker from '../../assets/styles/marker_default.svg';

function Canvas() {
  const canvasRef = useRef(null);
  const markerPositionRef = useRef(null);
  const activeMarkerRef = useRef(null);
  const [markerCoords, setMarkerCoords] = useState([]);

  const saveMarkerCoordsDebounced = useRef(
    debounce((coords) => {
      setMarkerCoords(coords);
    }, 250)
  ).current;

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
      const marker = new Image();
      marker.src = Marker;
      ctx.drawImage(marker, x - 24, y - 24, 48, 48);

      // 안에 텍스트 넣기
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('1', x - 1, y + 3);

      saveMarkerCoordsDebounced([{ x, y }]);
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

  useEffect(() => {
    console.log(markerCoords);
  }, [markerCoords]);

  return (
    <S.CanvasContainer>
      <canvas ref={canvasRef}></canvas>
    </S.CanvasContainer>
  );
}

export default Canvas;
