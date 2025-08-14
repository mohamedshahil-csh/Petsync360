// ThreeScene.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene: React.FC<{ width?: number; height?: number }> = ({
  width = 200,
  height = 200,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // === Setup scene ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // === Setup camera ===
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // === Setup renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // === Add a spinning cube ===
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x10b981 }); // emerald green
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // === Add lights ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // === Animation loop ===
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // === Cleanup on unmount ===
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [width, height]);

  return <div ref={mountRef} style={{ width, height }} />;
};

export default ThreeScene;
