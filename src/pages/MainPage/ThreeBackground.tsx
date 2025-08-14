// ThreeBackground.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b0214"); // Dark purple-black tone

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x55ffb1, 0.4); // soft greenish light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff4d8d, 1.2, 100); // pink glow
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating spheres group
    const group = new THREE.Group();
    scene.add(group);

    const spheres: THREE.Mesh[] = [];
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);

    // Emerald and pink colors
    const colors = [0x10b981, 0xff4d8d];

    for (let i = 0; i < 15; i++) {
      const color = colors[i % colors.length];
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.3,
      });
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      group.add(sphere);
      spheres.push(sphere);
    }

    // Animate
    let frameId: number;
    const animate = () => {
      group.rotation.y += 0.0015;
      group.rotation.x = Math.sin(Date.now() * 0.001) * 0.02;

      spheres.forEach((sphere, idx) => {
        sphere.position.y += Math.sin(Date.now() * 0.002 + idx) * 0.0015;
        sphere.position.x += Math.cos(Date.now() * 0.001 + idx) * 0.001;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ThreeBackground;
