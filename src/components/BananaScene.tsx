'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Banana({ index, total, clockTime }: { index: number, total: number, clockTime: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const angle = (index / total) * Math.PI * 2
  const orbitSpeed = 0.5
  const radius = 1.2

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * orbitSpeed + angle
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = Math.sin(t * 2) * 0.2
      
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(t) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#F4D03F" roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  )
}

function CoreProduct() {
   const meshRef = useRef<THREE.Mesh>(null)
   useFrame((state) => {
      if (meshRef.current) {
         meshRef.current.rotation.y += 0.005
      }
   })
   return (
      <mesh ref={meshRef}>
         <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
         <meshStandardMaterial color="#1B4332" roughness={0.2} metalness={0.5} />
      </mesh>
   )
}

export default function BananaScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', background: 'transparent' }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#F4D03F" />
        
        <Environment preset="forest" />
        
        <CoreProduct />
        {[...Array(6)].map((_, i) => (
           <Banana key={i} index={i} total={6} clockTime={0} />
        ))}
        
        <ContactShadows 
          position={[0, -1.8, 0]} 
          opacity={0.3} 
          scale={12} 
          blur={2} 
          far={4} 
        />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  )
}
