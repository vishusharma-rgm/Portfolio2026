import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FiBookOpen, FiCode, FiHeadphones, FiX } from "react-icons/fi";
import "../styles/DigitalRoom.css";

function Model({ path, position, scale = 1, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(path);
  const model = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z) || 1;
    const center = box.getCenter(new THREE.Vector3());
    ref.current.scale.setScalar(scale / maxSize);
    ref.current.position.sub(center.multiplyScalar(scale / maxSize));
  }, [scale]);
  return <primitive ref={ref} object={model} position={position} rotation={rotation} />;
}

export default function DigitalRoom({ open, onClose }) {
  const [focus, setFocus] = useState("desk");
  const [music, setMusic] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const toggleMusic = () => {
    if (music) {
      clearInterval(timerRef.current);
      audioRef.current?.close();
      audioRef.current = null;
      setMusic(false);
      return;
    }
    const audio = new AudioContext();
    audioRef.current = audio;
    const notes = [220, 277.18, 329.63, 440];
    let index = 0;
    const playNote = () => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.frequency.value = notes[index++ % notes.length];
      oscillator.type = "sine";
      gain.gain.setValueAtTime(0.0001, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, audio.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 1.2);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 1.25);
    };
    playNote();
    timerRef.current = setInterval(playNote, 1150);
    setMusic(true);
  };
  useEffect(() => () => { clearInterval(timerRef.current); audioRef.current?.close(); }, []);
  if (!open) return null;

  return (
    <div className="digital-room" role="dialog" aria-modal="true" aria-label="Vishu's Digital Room">
      <div className="room-toolbar"><div><span className="room-kicker">VISHU'S DIGITAL ROOM</span><h2>A quiet place to think.</h2><p>Move around. Scroll through the details. Stay a while.</p></div><div className="room-toolbar-actions"><button className={`room-music ${music ? "active" : ""}`} onClick={toggleMusic}><FiHeadphones /> {music ? "Music on" : "Play ambience"}</button><button className="room-close" onClick={onClose} title="Close digital room"><FiX /></button></div></div>
      <div className="room-scene">
        <Canvas camera={{ position: [5.8, 4.6, 7.8], fov: 36 }} shadows>
          <color attach="background" args={["#c9c1b7"]} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 7, 4]} intensity={3} castShadow />
          <Suspense fallback={null}>
            <mesh position={[0, -0.18, 0]} receiveShadow><boxGeometry args={[9, 0.25, 7]} /><meshStandardMaterial color="#81776b" roughness={0.78} /></mesh>
            <mesh position={[0, 3.5, -3.5]}><boxGeometry args={[9, 7.2, 0.2]} /><meshStandardMaterial color="#ded7ce" roughness={0.9} /></mesh>
            <Model path="/models/Table.glb" position={[0, 0, 0.2]} scale={2.2} />
            <Model path="/models/TableLamp.glb" position={[-2.1, 1.25, 0.05]} scale={1.35} />
            <Model path="/models/Book.glb" position={[1.1, 1.25, 0.2]} scale={1.2} rotation={[0, -0.25, 0]} />
            <Model path="/models/Pot_Plant.glb" position={[2.25, 1.15, -0.1]} scale={1.25} />
            <Environment preset="apartment" />
            <OrbitControls enablePan={false} minDistance={5} maxDistance={11} target={[0, 1, 0]} />
          </Suspense>
        </Canvas>
        <div className="room-hotspots"><button className={focus === "desk" ? "active" : ""} onClick={() => setFocus("desk")}><FiCode /> Work desk</button><button className={focus === "reading" ? "active" : ""} onClick={() => setFocus("reading")}><FiBookOpen /> Reading list</button><button className={focus === "sound" ? "active" : ""} onClick={() => setFocus("sound")}><FiHeadphones /> Soundtrack</button></div>
        <div className="room-card"><span>{focus === "desk" ? "THE DESK" : focus === "reading" ? "THE READING LIST" : "THE SOUNDTRACK"}</span><p>{focus === "desk" ? "Where ideas become things worth shipping." : focus === "reading" ? "Books, notes, and references that shape the way I think." : "A focused mix for long evenings and slow, deliberate work."}</p></div>
        <div className="room-scroll-note">Scroll to explore the room</div>
      </div>
    </div>
  );
}

useGLTF.preload("/models/Table.glb");
useGLTF.preload("/models/TableLamp.glb");
useGLTF.preload("/models/Book.glb");
useGLTF.preload("/models/Pot_Plant.glb");
