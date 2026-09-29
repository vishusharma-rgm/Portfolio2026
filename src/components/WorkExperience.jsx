import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperiences } from "../data/portfolio";
import "../styles/WorkExperience.css";

gsap.registerPlugin(ScrollTrigger);

function PartsAssemblingModel({ progress }) {
  const groupRef = useRef(null);
  const { scene, animations } = useGLTF("/assets/3d/parts-assembling.glb");
  const robot = useMemo(() => scene.clone(true), [scene]);
  const { actions, mixer } = useAnimations(animations, groupRef);
  const actionRef = useRef(null);

  useEffect(() => {
    const action = actions["Take 001"] || Object.values(actions)[0];
    if (!action) return;
    action.reset().play();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    // The scroll position is the only clock for this animation. The clip must
    // stay paused, otherwise it can play an extra open/close cycle on its own.
    action.paused = false;
    action.timeScale = 0;
    action.enabled = true;
    actionRef.current = action;
    return () => action.stop();
  }, [actions]);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollProgress = Math.max(0, Math.min(1, progress));
    // One complete open-close cycle across the entire experience column.
    // 0 = closed, 0.5 = fully open, 1 = closed again.
    const open = Math.sin(scrollProgress * Math.PI);
    const action = actionRef.current;
    if (action) {
      // The asset starts disassembled and finishes assembled.
      mixer.setTime(action.getClip().duration * open);
    }
  });

  return <primitive ref={groupRef} object={robot} />;
}


function ExperienceCopy({ item }) {
  return (
    <article className="experience-copy">
      <h3>
        {item.title} @ <span>{item.company}</span>
      </h3>
      <h4>{item.period}</h4>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

export default function WorkExperience() {
  const sectionRef = useRef(null);
  const rightColumnRef = useRef(null);
  // Start with a recognizable assembled robot; scrolling through the section
  // then reveals the destructured parts described by the heading.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray(".work-experience-section").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none", once: true } });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        endTrigger: rightColumnRef.current,
        end: "bottom bottom",
        scrub: 2,
        onUpdate: (self) => setProgress((current) => Math.abs(current - self.progress) > 0.002 ? self.progress : current),
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="work-experience-main-wrapper" id="experience" ref={sectionRef}>
      <h1 className="fixed-heading">
        <span className="orange">Destructuring </span>
        <span>My Work Experience.</span>
      </h1>

      <div className="left-column">
        <div className="parts-assembling">
          <Canvas camera={{ position: [0, 50, 210], fov: 75 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <directionalLight position={[0, 10, 10]} intensity={1.5} />
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <PartsAssemblingModel progress={progress} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="right-column" ref={rightColumnRef}>
        {workExperiences.map((item) => (
          <div className="work-experience-section" key={item.company}>
            <ExperienceCopy item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

useGLTF.preload("/assets/3d/parts-assembling.glb");
