import './App.css';
import Canvas from './containers/Canvas';
import EditorCanvas from './containers/EditorCanvas';

function App() {
  return (
    <main>
      <h3>캔버스 - 마커 구현</h3>
      <Canvas />

      <br />
      <h3>캔버스 - 회전 및 반전 구현</h3>
      <EditorCanvas />
    </main>
  );
}

export default App;
