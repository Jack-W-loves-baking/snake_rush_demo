import { useRef, useMemo, useLayoutEffect } from 'react';
import * as THREE from 'three';

import { Mesh } from 'three';
import { Position } from '../types';

interface Props {
  start: Position;
  end: Position;
  thickness?: number;
}

export const Line = ({ start, end, thickness = 0.1 }: Props) => {
  const lineRef = useRef<Mesh>(null);

  // Recreate the curve whenever start or end points change
  const curve = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.CatmullRomCurve3(points);
  }, [start, end]);

  useLayoutEffect(() => {
    if (lineRef.current) {
      const geometry = new THREE.TubeGeometry(curve, 20, thickness, 8, false);
      lineRef.current.geometry.dispose(); // Dispose of the old geometry
      lineRef.current.geometry = geometry; // Assign new geometry

      // You might not need to add/remove the line to/from the scene each time
      // unless it's being dynamically added or removed from the scene.
      return () => {
        geometry.dispose();
      };
    }
  }, [curve, thickness, lineRef]); // Remove `ref` and `scene` as dependencies, they're not changing

  return (
    <mesh ref={lineRef}>
      <meshBasicMaterial color="darkseagreen" />
    </mesh>
  );
};
