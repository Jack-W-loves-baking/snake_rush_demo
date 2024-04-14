import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { MeshStandardMaterial } from 'three';

export const Button = ({ position, onClick, label }) => {
  const ref = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const yRotation = Math.PI / 2;

  // Change the scale slightly when hovered or clicked
  useFrame(() => {
    if (ref.current) {
      const scale = hovered ? 1.2 : 1;
      ref.current.scale.x = scale;
      ref.current.scale.y = scale;
      ref.current.scale.z = active ? 0.9 : 1; // Compress a bit when active

      // Ensure the text scales correctly with the button
      if (textRef.current) {
        textRef.current.scale.x = 1 / scale;
        textRef.current.scale.y = 1 / scale;
      }
    }
  });

  return (
    <group position={position} ref={ref} rotation={[80, 0, 0]}>
      <Text
        ref={textRef}
        position={[0, 0, 10]} // Position the text slightly in front of the button
        fontSize={3} // Adjust the size as needed
        color="black" // Whatever color you need
        anchorX="center" // Center the text horizontally
        anchorY="middle" // Center the text vertically
        onClick={e => {
          setActive(!active);
          onClick();
        }}
        onPointerOver={e => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={e => {
          setHovered(false);
          setActive(false); // Optionally reset on pointer out
        }}
      >
        {label}
      </Text>
    </group>
  );
};
