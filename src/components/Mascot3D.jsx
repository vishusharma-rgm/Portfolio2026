import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "../styles/Mascot3D.css";

function CuteRobotModel() {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF("/assets/3d/cute_robot.glb");
  const robot = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = THREE.MathUtils.clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.2;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.2;

    groupRef.current.rotation.y = smooth.current.x * THREE.MathUtils.degToRad(25);
    groupRef.current.rotation.x = -smooth.current.y * THREE.MathUtils.degToRad(14);
    groupRef.current.scale.setScalar(1.5);
    // The GLB's origin sits low, so offset the enlarged model down inside the canvas.
    groupRef.current.position.y = -0.72 + Math.sin(state.clock.elapsedTime * 1.15) * 0.045;
  });

  return <primitive ref={groupRef} object={robot} dispose={null} />;
}

function Lights({ darkMode }) {
  return (
    <>
      <ambientLight intensity={darkMode ? 0.25 : 1} />
      <directionalLight position={[10, 10, 10]} intensity={darkMode ? 0.2 : 2} />
      <directionalLight position={[-6, 4, 8]} intensity={darkMode ? 0.55 : 0.35} />
    </>
  );
}

export default function Mascot3D({ darkMode = false }) {
  return (
    <div className="mascot-canvas-wrap">
      <Canvas
        // Keep a little breathing room around the model so its head never clips
        // when the pointer-driven tilt changes the bounds of the scene.
        camera={{ position: [0.4, 1.6, 18], fov: 25 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lights darkMode={darkMode} />
          <CuteRobotModel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/3d/cute_robot.glb");
