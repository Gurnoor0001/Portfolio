"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const noiseShader = `
  // Simple 3D noise function
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
             
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }
`;

export function GasGiant({ position, scale = 1, color1 = "#d35400", color2 = "#e67e22", color3 = "#f39c12" }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform vec3 c1;
    uniform vec3 c2;
    uniform vec3 c3;
    
    ${noiseShader}
    
    void main() {
      // Banding based on Y coordinate + noise
      float n = snoise(vPosition * 0.1 + vec3(time * 0.05, 0.0, 0.0));
      float bands = sin(vPosition.y * 3.0 + n * 2.0);
      
      vec3 finalColor = mix(c1, c2, smoothstep(-1.0, 0.0, bands));
      finalColor = mix(finalColor, c3, smoothstep(0.0, 1.0, bands));
      
      // Basic rim lighting
      float intensity = 1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
      vec3 atmosphere = vec3(0.2, 0.2, 0.2) * pow(intensity, 1.5);
      
      gl_FragColor = vec4(finalColor + atmosphere, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[10, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          c1: { value: new THREE.Color(color1) },
          c2: { value: new THREE.Color(color2) },
          c3: { value: new THREE.Color(color3) },
        }}
      />
    </mesh>
  );
}

export function MarsPlanet({ position, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    ${noiseShader}
    
    void main() {
      float n1 = snoise(vPosition * 0.3);
      float n2 = snoise(vPosition * 0.8 + n1);
      
      vec3 baseColor = vec3(0.8, 0.3, 0.1); // Mars red
      vec3 darkColor = vec3(0.4, 0.1, 0.0); // Dark craters/valleys
      
      vec3 finalColor = mix(darkColor, baseColor, smoothstep(-0.5, 0.5, n2));
      
      // Rim lighting
      float intensity = 1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0));
      vec3 atmosphere = vec3(0.8, 0.4, 0.2) * pow(intensity, 3.0);
      
      gl_FragColor = vec4(finalColor + atmosphere, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
}

export function Earth({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [colorMap, normalMap, specularMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg"
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Earth rotation
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshPhongMaterial
        map={colorMap}
        normalMap={normalMap}
        specularMap={specularMap}
        normalScale={new THREE.Vector2(2, 2)}
        shininess={15}
      />
    </mesh>
  );
}

function Moon({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Moon rotation
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        map={colorMap}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function RealisticPlanets() {
  return (
    <group>
      {/* Distant Earth */}
      <Earth position={[-60, 20, -100]} scale={0.6} />
      
      {/* Mars-like rocky planet near interpersonal */}
      <MarsPlanet position={[-50, -40, -180]} scale={1.2} />
      
      {/* Moon orbiting in the distance */}
      <Moon position={[30, 50, -250]} scale={1.5} />
      
      {/* Another Gas Giant near contact */}
      <GasGiant position={[-90, -10, -350]} scale={3.0} color1="#0f2027" color2="#203a43" color3="#2c5364" />
    </group>
  );
}
