import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh } from 'three';
import {
  ROAD_INIT_POSITION,
  ROAD_LENGTH,
  ROAD_SPEED,
  ROAD_WIDTH,
  SEGMENT_NUMBER,
  SNAKE_INIT_SIZE,
} from '../constants';
import { Line } from './Line';
import { Position } from '../types';

interface RoadSegment {
  position: Position;
}

export const Road = () => {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);

  const lineRef = useRef<Mesh>(null);

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
    if (!isAnimating) {
      return;
    }

    const newSegments = segments.map(segment => {
      let newPosZ = segment.position[2] + ROAD_SPEED;
      // Reset position if it goes beyond the camera's view
      const endPosZ =
        ROAD_INIT_POSITION[2] + ROAD_LENGTH / 2 - SNAKE_INIT_SIZE[2] / 2;
      if (newPosZ > endPosZ) {
        newPosZ = endPosZ;
      }
      return {
        position: [segment.position[0], segment.position[1], newPosZ],
      } as RoadSegment;
    });
    setSegments(newSegments);

    if (lineRef.current) {
      lineRef.current.position.z += ROAD_SPEED;
    }
  });
  return (
    <group>
      {segments.map((segment, i) => (
        <>
          <mesh
            key={i}
            rotation-x={-Math.PI / 2}
            position={segment.position}
            geometry={new PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH)}
            material={roadMaterial}
          />
        </>
      ))}
      <Line
        ref={lineRef}
        start={[0, 0, roadStartZ + SNAKE_INIT_SIZE[2] / 2]}
        end={[0, 0, roadStartZ - ROAD_LENGTH * SEGMENT_NUMBER]}
      />
    </group>
  );
};
