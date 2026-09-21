"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/data/data";
import { GasGiant, MarsPlanet } from "./RealisticPlanets";

function Planet({ 
  project, 
  radius, 
  speed, 
  angleOffset, 
  isBinary = false 
}: { 
  project: any; 
  radius: number; 
  speed: number; 
  angleOffset: number;
  isBinary?: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(time + angleOffset) * radius;
      meshRef.current.position.z = Math.sin(time + angleOffset) * radius;
      // We don't rotate the group on Y here so the Html doesn't spin wildly, 
      // the planet itself rotates inside GasGiant/MarsPlanet
    }
  });

  const size = isBinary ? 3 : 1.5;
  const isFirst = angleOffset === 0;

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {isFirst ? (
        <GasGiant position={[0, 0, 0]} scale={size / 10} color1="#3B82F6" color2="#1E40AF" color3="#93C5FD" />
      ) : (
        <MarsPlanet position={[0, 0, 0]} scale={size / 5} />
      )}
      
      <Html distanceFactor={80} center className="pointer-events-auto">
        <div 
          className={`transition-all duration-300 ${hovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'} bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white min-w-[250px] shadow-2xl`}
        >
          <h3 className="text-lg font-display font-bold text-cosmic-blue">{project.title}</h3>
          <p className="text-xs text-slate-300 mt-1">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech?.slice(0,3).map((t: string) => (
              <span key={t} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-magenta-glow">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ProjectsGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const projects = portfolioData.projects;

  useFrame(() => {
    if (groupRef.current) {
      // Slowly rotate the entire galaxy system
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.z = 0.1; // Slight tilt
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -200]}>
      {projects.map((project, index) => (
        <Planet 
          key={project.title} 
          project={project} 
          radius={12 + index * 4} 
          speed={0.2 - index * 0.05} 
          angleOffset={index * Math.PI} 
          isBinary={true} 
        />
      ))}
    </group>
  );
}
