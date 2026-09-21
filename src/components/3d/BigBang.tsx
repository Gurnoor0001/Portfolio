"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";
import gsap from "gsap";

export default function BigBang() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { hasSeenIntro, setHasSeenIntro } = useAppStore();

  useEffect(() => {
    if (hasSeenIntro) return;

    // Initial state
    if (meshRef.current) {
      meshRef.current.scale.set(0.01, 0.01, 0.01);
    }
    if (materialRef.current) {
      materialRef.current.opacity = 1;
    }

    // Animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setHasSeenIntro(true);
      },
    });

    if (meshRef.current && materialRef.current) {
      tl.to(meshRef.current.scale, {
        x: 100,
        y: 100,
        z: 100,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        materialRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        "-=1" // start fading out before expanding finishes
      );
    }

    return () => {
      tl.kill();
    };
  }, [hasSeenIntro, setHasSeenIntro]);

  if (hasSeenIntro) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        ref={materialRef} 
        color="#ffffff" 
        transparent 
        depthWrite={false}
      />
    </mesh>
  );
}
