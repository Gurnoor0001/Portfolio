"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    
    // Event horizon (black hole center)
    if(r < 0.3) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    
    // Accretion disk
    float disk = smoothstep(0.3, 0.5, r) - smoothstep(0.5, 0.8, r);
    float angle = atan(p.y, p.x);
    
    // Swirling effect
    float swirl = sin(angle * 10.0 + time * 5.0 + 10.0 / r);
    
    vec3 color = vec3(1.0, 0.5, 0.0) * disk * (0.5 + 0.5 * swirl); // Orange glow
    color += vec3(0.5, 0.0, 1.0) * disk * (1.0 - swirl); // Purple glow
    
    gl_FragColor = vec4(color, disk);
  }
`;

export default function BlackHole() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      // Make it always face the camera
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -350]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
