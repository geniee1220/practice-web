import { useEffect, useRef, useState } from 'react';
import * as S from './styles';

function EditorCanvas() {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
      const image = loadedImages[0];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (flipped) ctx.scale(-1, 1);
      ctx.drawImage(
        image,
        -canvasWidth / 2,
        -canvasHeight / 2,
        canvasWidth,
        canvasHeight
      );
      ctx.restore();
    }

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [rotation, flipped]);

  return (
    <>
      <div style={divStyle}>
        <button style={buttonStyle} onClick={() => setRotation(rotation + 90)}>
          Rotate
        </button>
        <button style={buttonStyle} onClick={() => setFlipped(!flipped)}>
          Flip
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            setRotation(0);
            setFlipped(false);
          }}
        >
          Reset
        </button>
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
