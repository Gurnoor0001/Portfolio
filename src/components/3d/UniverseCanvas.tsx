"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useAppStore } from "@/store/useAppStore";
import Nebula from "./Nebula";
import BigBang from "./BigBang";
import CameraController from "./CameraController";
import SkillsConstellation from "./SkillsConstellation";
import ProjectsGalaxy from "./ProjectsGalaxy";
import BlackHole from "./BlackHole";
import RealisticPlanets from "./RealisticPlanets";

export default function UniverseCanvas() {
  const fastMode = useAppStore((state) => state.fastMode);

  if (fastMode) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#020205"]} />
        <ambientLight intensity={0.5} />
        
        <CameraController />
        
        <Suspense fallback={null}>
          <Nebula />
          <BigBang />
          <SkillsConstellation />
          <ProjectsGalaxy />
          <RealisticPlanets />
          <BlackHole />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
