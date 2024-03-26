import { useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';

import * as S from './styles';
import Marker from '../../assets/styles/marker_default.svg';
import Disabled from '../../assets/styles/marker_disabled.svg';

function Tooltip({ x, y }) {
  if (!x || !y) return null;

  return (
    <div
      style={{
        position: 'absolute',
        width: '280px',
        left: x - 140,
        top: y + 24,
        borderRadius: '4px',
        backgroundColor: '#FBEAE9',
        color: '#000',
        padding: '8px 16px',
        zIndex: 10,
      }}
    >
      마커를 하자의 위치로 드래그하세요.
    </div>
  );
}

const DISABLED_MARKER_ARRAY = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 },
];

function Canvas() {
  const canvasRef = useRef(null);
  const markerPositionRef = useRef(null);
  const activeMarkerRef = useRef(null);
  const [markerCoords, setMarkerCoords] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [firstMarkerPlaced, setFirstMarkerPlaced] = useState(false);

  const saveMarkerCoordsDebounced = useRef(
    debounce((coords) => {
      setMarkerCoords(coords);
    }, 250)
  ).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    const markerImage = new Image();
    markerImage.src = Marker;

    const disabledImage = new Image();
    disabledImage.src = Disabled;

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      preloadImages()
        .then(() => drawImage())
        .then(() => {
          const originalCanvasWidth = 588;
          const originalCanvasHeight = 588;

          const ratioX = canvasWidth / originalCanvasWidth;
          const ratioY = canvasHeight / originalCanvasHeight;

          // 비활성화된 마커 재조정 및 재그리기
          DISABLED_MARKER_ARRAY.forEach((coords, index) => {
            const newX = coords.x * ratioX;
            const newY = coords.y * ratioY;
            disabledDrawMarker(newX, newY, index);
          });

          // 활성화된 마커 재조정 및 재그리기
          if (markerPositionRef.current) {
            const { x, y } = markerPositionRef.current;
            const newX = x * ratioX;
            const newY = y * ratioY;
            drawMarker(newX, newY);
          }
        });
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

      DISABLED_MARKER_ARRAY.forEach(({ x, y }, index) => {
        const ratioX = canvasRef.current.width / 588;
        const ratioY = canvasRef.current.height / 588;
        const newX = x * ratioX;
        const newY = y * ratioY;
        disabledDrawMarker(newX, newY, index);
      });
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

      DISABLED_MARKER_ARRAY.forEach(({ x, y }, index) => {
        const ratioX = canvasRef.current.width / 588;
        const ratioY = canvasRef.current.height / 588;
        const newX = x * ratioX;
        const newY = y * ratioY;
        disabledDrawMarker(newX, newY, index);
      });
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
      const text = (
        DISABLED_MARKER_ARRAY.length +
        markerCoords.length +
        1
      ).toString();

      if (markerImage.complete) {
        ctx.drawImage(markerImage, x - 24, y - 24, 48, 48);

        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(text, x - 1, y + 3);
      } else {
        markerImage.onload = function () {
          ctx.drawImage(markerImage, x - 24, y - 24, 48, 48);

          ctx.font = '16px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(text, x - 1, y + 3);
        };
      }

      saveMarkerCoordsDebounced([{ x, y }]);
    }

    function disabledDrawMarker(x, y, index) {
      const text = (index + 1).toString();

      if (disabledImage.complete) {
        ctx.drawImage(disabledImage, x - 16, y - 20, 32, 40);

        ctx.font = '16px Arial';
        ctx.fillStyle = '#1e1e1e';
        ctx.textAlign = 'center';
        ctx.fillText(text, x - 1, y + 4);
      } else {
        disabledImage.onload = function () {
          ctx.drawImage(disabledImage, x - 16, y - 20, 32, 40);

          ctx.font = '16px Arial';
          ctx.fillStyle = '#1e1e1e';
          ctx.textAlign = 'center';
          ctx.fillText(text, x - 1, y + 4);
        };
      }
    }

    window.addEventListener('resize', debounce(resize, 100));
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousedown', handleMouseDown);
    resize();

    return () => {
      window.removeEventListener('resize', debounce(resize, 100));
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // 처음 찍은 마커에만 툴팁을 보여주기
  useEffect(() => {
    console.log(...markerCoords, 'markerCoords');

    if (markerCoords.length > 0 && !firstMarkerPlaced) {
      setTooltipVisible(true);
      setFirstMarkerPlaced(true);
    } else {
      setTooltipVisible(false);
    }
  }, [markerCoords]);

  return (
    <S.CanvasWrapper>
      <S.CanvasContainer>
        <canvas ref={canvasRef}></canvas>

        {tooltipVisible && (
          <Tooltip x={markerCoords[0]?.x} y={markerCoords[0]?.y} />
        )}
      </S.CanvasContainer>
    </S.CanvasWrapper>
  );
}

export default Canvas;
