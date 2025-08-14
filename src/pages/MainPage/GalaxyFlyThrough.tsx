import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Starfield({ hovered }: { hovered: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  const { size } = useThree();

  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 5000; i++) {
      temp.push(
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000),
        THREE.MathUtils.randFloatSpread(1000)
      );
    }
    return new Float32Array(temp);
  }, []);

  React.useEffect(() => {
    if (!hovered) {
      // Reset target rotation when not hovered
      setTargetRotation({ x: 0, y: 0 });
      return;
    }
    function onMouseMove(event: MouseEvent) {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = (event.clientY / size.height) * 2 - 1;
      setTargetRotation({ x: y * 0.5, y: x * 0.5 });
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [hovered, size]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      if (hovered) {
        // Smooth rotation following mouse
        pointsRef.current.rotation.x += (targetRotation.x - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y += (targetRotation.y - pointsRef.current.rotation.y) * 0.05;
      } else {
        // Slow automatic rotation when not hovered
        pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
        pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[stars, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={1}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function CameraFly({ hovered }: { hovered: boolean }) {
  const { camera } = useThree();

useFrame((state) => {
  if (!hovered) {
    const delta = state.clock.getDelta();
    camera.position.z -= 10 * delta;
    if (camera.position.z < -500) {
      camera.position.z = 500;
    }
  }
});

  return null;
}

export default function GalaxyFlyThrough() {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 500], fov: 75 }}
      style={{ width: "100vw", height: "100vh", background: "black" }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Starfield hovered={hovered} />
      <CameraFly hovered={hovered} />
    </Canvas>
  );
}
