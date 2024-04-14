import { useRef } from 'react';

import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const Camera = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const { camera } = useThree();

  camera.position.set(0, 30, 20);
  camera.lookAt(0, 0, 0);

  return (
    <>
      <ambientLight intensity={1} />
      <CameraControls ref={cameraControlRef} />
    </>
  );
};
