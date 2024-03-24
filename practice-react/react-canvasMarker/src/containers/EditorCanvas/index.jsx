import { useEffect, useRef } from 'react';
import * as S from './styles';

function EditorCanvas() {
  const canvasRef = useRef(null);

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
    padding: '10px',
  };

  const buttonStyle = {
    margin: '0 5px',
    padding: '5px 10px',
    border: '1px solid #ddd',
  };

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <div style={divStyle}>
        <button style={buttonStyle}>rotate</button>
        <button style={buttonStyle}>revert</button>
        <butto style={buttonStyle}>reset</butto>
      </div>
      <S.CanvasWrapper>
        <S.CanvasContainer>
          <canvas ref={canvasRef}></canvas>
        </S.CanvasContainer>
      </S.CanvasWrapper>
    </>
  );
}

export default EditorCanvas;
