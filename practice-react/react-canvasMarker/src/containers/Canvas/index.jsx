import { useRef } from 'react';
import * as S from './styles';

function Canvas() {
  const canvasRef = useRef(null);

  return (
    <S.CanvasContainer>
      <canvas ref={canvasRef}></canvas>
    </S.CanvasContainer>
  );
}

export default Canvas;
