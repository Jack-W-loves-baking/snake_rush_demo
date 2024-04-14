import { useState, useEffect, forwardRef } from 'react';
import { useRef } from 'react';
import { Mesh } from 'three';

import {
  COLOR,
  ROAD_WIDTH,
  SNAKE_INIT_SIZE,
  SNAKE_MOVE_SPEED,
} from '../constants';
import { SNAKE_INIT_POSITION } from '../constants';

import { useSpring, a } from '@react-spring/three';

export interface Props {
  initPosition: [number, number, number];
}

export const Snake = forwardRef(({}, ref) => {
  const [position, setPosition] =
    useState<[number, number, number]>(SNAKE_INIT_POSITION);
  // const snakeRef = useRef<Mesh>(null);

  const { pos } = useSpring({
    pos: position,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a' || event.key === 'A') {
        setPosition(prev => {
          if (prev[0] - SNAKE_MOVE_SPEED >= -ROAD_WIDTH / 2) {
            return [prev[0] - SNAKE_MOVE_SPEED, prev[1], prev[2]];
          }
          return prev;
        });
      } else if (event.key === 'd' || event.key === 'D') {
        setPosition(prev => {
          if (prev[0] + SNAKE_MOVE_SPEED <= ROAD_WIDTH / 2) {
            return [prev[0] + SNAKE_MOVE_SPEED, prev[1], prev[2]];
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <a.mesh position={pos} ref={ref}>
      <boxGeometry args={SNAKE_INIT_SIZE} />
      <meshStandardMaterial color={COLOR.GREEN} />
    </a.mesh>
  );
});
