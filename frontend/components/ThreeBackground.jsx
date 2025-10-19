import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls, Stars } from "@react-three/drei";

const ThreeBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Stars radius={100} depth={50} count={4000} factor={4} fade />
        <Sphere args={[1, 64, 64]} position={[0, 0, -5]}>
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#22d3ee"
            emissiveIntensity={0.5}
            wireframe
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
