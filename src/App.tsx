import { Canvas } from '@react-three/fiber';
import { Road, Snake } from './components';
import './App.css';

import { Camera } from './components/Camera';

function App() {
  return (
    <div className="canvas-container">
      <Canvas>
        <Camera />
        <Snake />
        <Road />
      </Canvas>
    </div>
  );
}

export default App;
