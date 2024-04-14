import { forwardRef, useMemo } from 'react';
import * as THREE from 'three';
import { useLayoutEffect } from 'react';

import { Position } from '../types';
import { useThree } from '@react-three/fiber';

interface Props {
  start: Position;
  end: Position;
  thickness?: number;
}
export const Line = forwardRef<THREE.Mesh, Props>(
  ({ start, end, thickness = 0.1 }, ref) => {
    const curve = useMemo(() => {
      const points = [start, end].map(point => new THREE.Vector3(...point));
      return new THREE.CatmullRomCurve3(points);
    }, [start, end]);

    const { scene } = useThree();

    useLayoutEffect(() => {
      if (ref && (ref as any).current) {
        const geometry = new THREE.TubeGeometry(curve, 20, thickness, 8, false);
        (ref as any).current.geometry.dispose();
        (ref as any).current.geometry = geometry;
        scene.add((ref as any).current);

        return () => {
          if ((ref as any).current) {
            scene.remove((ref as any).current);
          }
          geometry.dispose();
        };
      }
    }, [curve, thickness, ref, scene]);

    return (
      <mesh ref={ref}>
        <meshBasicMaterial color="darkseagreen" />
      </mesh>
    );
  }
);
