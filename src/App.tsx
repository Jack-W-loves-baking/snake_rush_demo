import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';

import './App.css';
import { Road, Snake } from './components';
import { Camera } from './components/Camera';
import { ROAD_SPEED } from './constants';

// import { Mesh } from 'three';

const questionItems = [
  {
    q: 'What is hello in Japanese',
    a: 'こんにちは',
    b: 'グーグル朝',
    correctAnswer: 'a',
  },
  { q: 'What is hello in Chinese', a: '早上好', b: '你好', correctAnswer: 'b' },
  {
    q: 'What is hello in Korean',
    a: '구글 모닝',
    b: '안녕하세요',
    correctAnswer: 'b',
  },
  { q: 'What is hello in Spanish', a: 'Hola', b: 'mañana', correctAnswer: 'a' },
  {
    q: 'What is hello in Hindi',
    a: 'shubh prabhaat',
    b: 'namaste',
    correctAnswer: 'b',
  },
];

const questions = Array.from({ length: 20 }, () => questionItems).flat();

function App() {
  const snakeRef = useRef<any>(null);
  const [curIndex, setCurIndex] = useState(1);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const [roadSpeed, setRoadSpeed] = useState<number>(ROAD_SPEED);

  return (
    <div className="canvas-container">
      <div
        style={{
          position: 'absolute',
          fontWeight: 'bold',
          fontSize: '36px',
          zIndex: 2,
        }}
      >
        Questions {curIndex}:
        {questions.map((item, index) => {
          return (
            <div
              key={index}
              style={{ display: curIndex - 1 === index ? 'block' : 'none' }}
            >
              {item.q}
              <div style={{ display: 'flex' }}>
                {`A: ${item.a}  `}
                B: {item.b}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          right: '50px',
          fontWeight: 'bold',
          fontSize: '36px',
        }}
      >
        {`Combo: ${totalCorrect}`}
      </div>
      <div
        style={{
          position: 'absolute',
          right: '50px',
          top: '50px',
          fontWeight: 'bold',
          fontSize: '36px',
        }}
      >
        {`Speed: ${roadSpeed.toFixed(2)}`}
      </div>
      <Canvas>
        <Camera />
        <Snake ref={snakeRef} />
        <Road
          snakeRef={snakeRef}
          setCurIndex={setCurIndex}
          setTotalCorrect={setTotalCorrect}
          roadSpeed={roadSpeed}
          setRoadSpeed={setRoadSpeed}
          answer={questions[curIndex - 1].correctAnswer}
        />
      </Canvas>
    </div>
  );
}

export default App;
