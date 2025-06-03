"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Environment, Float, Sphere, Ring } from "@react-three/drei"
import * as THREE from "three"

/**
 * Cryptocurrency data configuration
 * Defines the cryptocurrencies that will orbit around the security symbol
 */
const cryptoData = [
  { name: "BTC", color: "#F7931A", symbol: "₿", radius: 4, speed: 0.5 },
  { name: "ETH", color: "#627EEA", symbol: "Ξ", radius: 5, speed: 0.7 },
  { name: "MATIC", color: "#8247E5", symbol: "⬟", radius: 6, speed: 0.9 },
  { name: "SOL", color: "#9945FF", symbol: "◎", radius: 7, speed: 1.1 },
  { name: "SUI", color: "#4DA2FF", symbol: "~", radius: 8, speed: 1.3 },
]

/**
 * Central Security Shield Component
 * Renders the main security symbol at the center of the animation
 */
function SecurityShield() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animate the shield with gentle rotation and floating effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef}>
        {/* Main shield body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.3, 6]} />
          <meshStandardMaterial
            color="#14B8A6"
            metalness={0.8}
            roughness={0.2}
            emissive="#14B8A6"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Shield inner glow */}
        <mesh position={[0, 0, 0.1]}>
          <cylinderGeometry args={[1.2, 1.4, 0.1, 6]} />
          <meshStandardMaterial
            color="#20F5E8"
            metalness={0.9}
            roughness={0.1}
            emissive="#20F5E8"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Security symbol text */}
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.8}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          🛡️
        </Text>

        {/* Protective rings around the shield */}
        <Ring args={[2.2, 2.4, 32]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#14B8A6" transparent opacity={0.3} emissive="#14B8A6" emissiveIntensity={0.1} />
        </Ring>

        <Ring args={[2.6, 2.8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#20F5E8" transparent opacity={0.2} emissive="#20F5E8" emissiveIntensity={0.1} />
        </Ring>
      </group>
    </Float>
  )
}

/**
 * Orbiting Cryptocurrency Component
 * Renders individual cryptocurrency symbols that orbit around the security shield
 */
function OrbitingCrypto({
  crypto,
  index,
}: {
  crypto: { name: string; color: string; symbol: string; radius: number; speed: number }
  index: number
}) {
  const meshRef = useRef<THREE.Group>(null)

  // Calculate orbital motion with unique phase offset for each crypto
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const phaseOffset = (index * Math.PI * 2) / cryptoData.length

      // Orbital position calculation
      const x = Math.cos(time * crypto.speed + phaseOffset) * crypto.radius
      const z = Math.sin(time * crypto.speed + phaseOffset) * crypto.radius
      const y = Math.sin(time * crypto.speed * 0.5 + phaseOffset) * 0.5

      meshRef.current.position.set(x, y, z)

      // Make crypto symbols face the center
      meshRef.current.lookAt(0, 0, 0)

      // Add gentle rotation to the symbols
      meshRef.current.rotation.z = time * 0.5 + phaseOffset
    }
  })

  return (
    <group ref={meshRef}>
      {/* Crypto symbol sphere */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.1}>
        <Sphere args={[0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={crypto.color}
            metalness={0.7}
            roughness={0.3}
            emissive={crypto.color}
            emissiveIntensity={0.3}
          />
        </Sphere>

        {/* Crypto symbol text */}
        <Text
          position={[0, 0, 0.41]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          {crypto.symbol}
        </Text>

        {/* Crypto name label */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color={crypto.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          {crypto.name}
        </Text>

        {/* Glowing ring around crypto */}
        <Ring args={[0.5, 0.6, 16]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={crypto.color}
            transparent
            opacity={0.4}
            emissive={crypto.color}
            emissiveIntensity={0.2}
          />
        </Ring>
      </Float>
    </group>
  )
}

/**
 * Particle System Component
 * Creates floating particles for additional visual effects
 */
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)

  // Generate random particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  // Animate particles with gentle floating motion
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#14B8A6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Main 3D Scene Component
 * Orchestrates all the 3D elements in the security animation
 */
function Scene() {
  return (
    <>
      {/* Lighting setup for realistic rendering */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#14B8A6" />

      {/* Environment for reflections and ambient lighting */}
      <Environment preset="night" />

      {/* Central security shield */}
      <SecurityShield />

      {/* Orbiting cryptocurrencies */}
      {cryptoData.map((crypto, index) => (
        <OrbitingCrypto key={crypto.name} crypto={crypto} index={index} />
      ))}

      {/* Background particle system */}
      <ParticleSystem />
    </>
  )
}

/**
 * Main Crypto Security Animation Component
 *
 * This component creates a 3D animated scene showing cryptocurrencies
 * orbiting around a central security shield symbol. It demonstrates
 * the concept of comprehensive security protection for multiple blockchain assets.
 *
 * Features:
 * - 3D security shield at the center with glowing effects
 * - Multiple cryptocurrencies (Bitcoin, Ethereum, Polygon, Solana, Sui) orbiting
 * - Smooth animations with different orbital speeds and patterns
 * - Particle effects for enhanced visual appeal
 * - Responsive design that works on different screen sizes
 * - Performance optimized with proper cleanup and efficient rendering
 */
export default function CryptoSecurityAnimation() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      {/* 3D Canvas with performance optimizations */}
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Responsive pixel ratio for different devices
      >
        <Scene />
      </Canvas>

      {/* Overlay gradient for better integration with the page */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

      {/* Loading fallback (hidden when 3D loads) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading 3D Security Visualization...</p>
        </div>
      </div>
    </div>
  )
}
