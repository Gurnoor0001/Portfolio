"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/data/data";

export default function SkillsConstellation() {
  const groupRef = useRef<THREE.Group>(null);

  // Flatten skills into a single array for rendering
  const allSkills = useMemo(() => {
    let index = 0;
    return Object.entries(portfolioData.skills).flatMap(([category, skills]) => 
      skills.map(skill => {
        // Distribute skills pseudo-randomly in a sphere
        const phi = Math.acos(-1 + (2 * index) / 30);
        const theta = Math.sqrt(30 * Math.PI) * phi;
        const r = 15 + Math.random() * 5; // Radius of constellation
        
        index++;
        
        return {
          id: `${category}-${skill}`,
          name: skill,
          category,
          position: new THREE.Vector3(
            r * Math.cos(theta) * Math.sin(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(phi)
          )
        };
      })
    );
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {allSkills.map((skill) => (
        <group key={skill.id} position={skill.position}>
          {/* Star marker */}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#008080" />
          </mesh>
          
          {/* Label */}
          <Html distanceFactor={50} center className="pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-white/10 opacity-70 transition-opacity hover:opacity-100">
              {skill.name}
            </div>
          </Html>
        </group>
      ))}
      
      {/* Optional: Add lines connecting nodes in the same category */}
      {/* For simplicity, we just have them orbit in a group here */}
    </group>
  );
}
