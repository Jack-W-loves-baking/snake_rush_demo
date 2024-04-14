import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { DoubleSide, Group, MeshBasicMaterial, PlaneGeometry } from 'three';

import {
  BLOCK_INIT_SIZE,
  ROAD_INIT_POSITION,
  ROAD_LENGTH,
  ROAD_SPEED,
  ROAD_WIDTH,
  SEGMENT_NUMBER,
  SNAKE_INIT_SIZE,
} from '../constants';
import { Position } from '../types';

import { Line } from './Line';

interface RoadSegment {
  position: Position;
}

export const Road = ({
  snakeRef,
  setCurIndex,
  answer,
  setTotalCorrect,
  setRoadSpeed,
  roadSpeed,
}) => {
  const groupRef = useRef<Group>(null);
  const curSegmentRef = useRef<number>(-1);
  const roadStartZ = ROAD_INIT_POSITION[2];
  const roadMaterial = new MeshBasicMaterial({
    color: 'white',
    side: DoubleSide,
  });

  const [segments, setSegments] = useState<RoadSegment[]>(() =>
    Array.from({ length: SEGMENT_NUMBER }, (_, i) => ({
      position: [
        0,
        0,
        -i * ROAD_LENGTH +
          roadStartZ -
          ROAD_LENGTH / 2 +
          SNAKE_INIT_SIZE[2] / 2,
      ],
    }))
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z += roadSpeed;
    }
  });

  useFrame(() => {
    const curSegment = Math.ceil(
      groupRef.current!.position.z / ROAD_LENGTH + 0.5
    );
    setCurIndex(curSegment);

    const segmentMove = curSegment * ROAD_LENGTH - ROAD_LENGTH / 2;
    const snakeMove = Math.ceil(groupRef.current!.position.z + 2);
    const snakeX = snakeRef.current.position.x;
    if (Math.abs(snakeMove - segmentMove) < 3) {
      if (curSegmentRef.current !== curSegment) {
        if ((snakeX <= 0 && answer === 'a') || (snakeX > 0 && answer === 'b')) {
          setRoadSpeed(pre => (pre > 7 ? pre : pre + 0.2));
          setTotalCorrect(pre => pre + 1);
        } else {
          setRoadSpeed(pre => (pre - 0.2 <= 0 ? 0.2 : pre - 0.2));
        }
        curSegmentRef.current = curSegment;
      }
    }
  });
  return (
    <group ref={groupRef}>
      {segments.map((segment, i) => (
        <group key={i}>
          <mesh
            rotation-x={-Math.PI / 2}
            position={segment.position}
            geometry={new PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH)}
            material={roadMaterial}
          />
          <mesh
            position={[
              segment.position[0] - 10,
              segment.position[1],
              segment.position[2],
            ]}
          >
            <boxGeometry args={BLOCK_INIT_SIZE} />
            <meshStandardMaterial color="dodgerblue" />
          </mesh>

          <mesh
            position={[
              segment.position[0] + 10,
              segment.position[1],
              segment.position[2],
            ]}
          >
            <boxGeometry args={BLOCK_INIT_SIZE} />
            <meshStandardMaterial color="orangered" />
          </mesh>
        </group>
      ))}
      <Line
        start={[0, 0, roadStartZ + SNAKE_INIT_SIZE[2] / 2]}
        end={[
          0,
          0,
          roadStartZ - ROAD_LENGTH * SEGMENT_NUMBER + SNAKE_INIT_SIZE[2] / 2,
        ]}
      />
    </group>
  );
};
