import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Starfield background component
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points in 3D space
  const stars = useMemo(() => {
    const starsArray = [];
    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      starsArray.push(x, y, z);
    }
    return new Float32Array(starsArray);
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
       <bufferAttribute
  attach="attributes-position"
  args={[stars, 3]}
/>
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.7}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}

// Twinkling floating star replacing Cat
function FloatingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [goingUp, setGoingUp] = useState(true);
  const speed = 1;
  const maxHeight = 3;
  const minHeight = 0.5;

  useFrame((state, delta) => {
    if (meshRef.current) {
      let newY = meshRef.current.position.y;
      if (goingUp) {
        newY += delta * speed;
        if (newY >= maxHeight) setGoingUp(false);
      } else {
        newY -= delta * speed;
        if (newY <= minHeight) setGoingUp(true);
      }
      meshRef.current.position.y = newY;

      // Twinkle effect by varying emissive intensity
      const emissiveIntensity = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 5);
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = emissiveIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial
        color="#a5f3fc"
        emissive="#3b82f6"
        emissiveIntensity={1}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// Glowing rotating cube (planet/star)
function GlowingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const speedX = hovered ? 2 : 0.3;
      const speedY = hovered ? 2.5 : 0.4;
      meshRef.current.rotation.x += delta * speedX;
      meshRef.current.rotation.y += delta * speedY;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#0ea5e9"
        emissiveIntensity={0.9}
        roughness={0.2}
        metalness={0.7}
        transparent={true}
        opacity={0.85}
      />
    </mesh>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [6, 4, 6], fov: 60 }}
      style={{ width: "400px", height: "400px", background: "#0a0a23" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7dd3fc" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {/* Background stars */}
      <Starfield />

      {/* Floating star */}
      <FloatingStar />

      {/* Glowing rotating cube */}
      <GlowingCube />
    </Canvas>
  );
}
