"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 5));
  
  useEffect(() => {
    // We map the total scroll height to a Z-depth for the camera to fly through
    // Section 1: Home (z: 5)
    // Section 2: Skills (z: -50)
    // Section 3: Education (z: -100)
    // Section 4: Interpersonal (z: -150)
    // Section 5: Projects (z: -200)
    // Section 6: Certifications (z: -250)
    // Section 7: Achievements (z: -300)
    // Section 8: Contact (z: -350)
    
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const maxZ = -400;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = scrollY / maxScroll;
      
      // Calculate target Z
      const targetZ = 5 + progress * (maxZ - 5);
      cameraTarget.current.z = targetZ;
      
      // Slight rotation based on scroll to make it feel like "flying"
      cameraTarget.current.x = Math.sin(progress * Math.PI * 2) * 2;
      cameraTarget.current.y = Math.cos(progress * Math.PI * 2) * 1;
    };

    window.addEventListener("scroll", onScroll);
    // Initial call
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    // Smoothly interpolate camera position towards target
    state.camera.position.lerp(cameraTarget.current, 0.05);
    
    // Look slightly ahead of the camera's path
    const lookAtTarget = new THREE.Vector3(
      state.camera.position.x * 0.5,
      state.camera.position.y * 0.5,
      state.camera.position.z - 10
    );
    state.camera.lookAt(lookAtTarget);
  });

  return null;
}
