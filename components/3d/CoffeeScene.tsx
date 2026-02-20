"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Cup() {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.45, 1.2, 32, 1, true]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.15}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          iridescence={0.15}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#f5e6d3"
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Bean({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh position={position} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#3d2314" roughness={0.8} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#f5e6d3" />
      <Environment preset="apartment" />
      <Cup />
      {[
        [0.8, 0.3, 0.2],
        [-0.6, -0.2, 0.5],
        [0.3, -0.5, -0.4],
        [-0.4, 0.4, -0.3],
      ].map((p, i) => (
        <Bean key={i} position={p as [number, number, number]} />
      ))}
    </>
  );
}

export function CoffeeScene() {
  return (
    <div className="absolute right-[10%] top-1/2 h-[min(50vh,320px)] w-[min(50vw,320px)] -translate-y-1/2 rounded-2xl bg-[var(--espresso-soft)]/30 backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
