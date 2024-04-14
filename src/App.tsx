import { Canvas } from '@react-three/fiber';
import { Road, Snake } from './components';
import './App.css';

import { Camera } from './components/Camera';
import { useRef, useState } from 'react';
// import { Mesh } from 'three';

const questionItems = [
  {q:'What is hello in Japanese', a:'こんにちは', b:'グーグル朝', correctAnswer: 'a'},
  {q:'What is hello in Chinese', a:'早上好', b:'你好', correctAnswer: 'b'},
  {q:'What is hello in Korean', a:'구글 모닝', b:'안녕하세요', correctAnswer: 'b'},
  {q:'What is hello in Spanish', a:'Hola', b:'mañana', correctAnswer: 'a'},
  {q:'What is hello in Hindi', a:'shubh prabhaat', b:'namaste', correctAnswer: 'b'}
];

const questions = Array.from({ length: 20 }, () => questionItems).flat();

function App() {
  const snakeRef = useRef<any>(null);
  const [curIndex, setCurIndex] = useState(1);
  return (
    <div className="canvas-container">
      <div style={{position: 'absolute', fontWeight: 'bold', fontSize: '36px', zIndex: 2}}>
        题目{curIndex}
        {
          questions.map((item, index)=> {
            return (
              <div style={{display: curIndex - 1 === index ? 'block': 'none'}}>
                {item.q}
                <div style={{display: 'flex'}}>
                  {`A: ${item.a}  `}
                  B: {item.b}
                </div>
              </div>
            )
          })
        }

      </div>
      <Canvas>
        <Camera />
        <Snake ref={snakeRef}/>
        <Road snakeRef={snakeRef} setCurIndex={setCurIndex} answer={questions[curIndex].correctAnswer}/>
      </Canvas>
    </div>
  );
}

export default App;
