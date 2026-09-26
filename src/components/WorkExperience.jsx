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
  const { actions } = useAnimations(animations, groupRef);
  const actionRef = useRef(null);

  useEffect(() => {
    const action = actions["Take 001"] || Object.values(actions)[0];
    if (!action) return;
    action.reset().play();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.paused = true;
    action.timeScale = 0;
    action.enabled = true;
    actionRef.current = action;
    return () => action.stop();
  }, [actions]);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollProgress = Math.max(0, Math.min(1, progress));
    const open = scrollProgress < 0.5 ? scrollProgress * 2 : (1 - scrollProgress) * 2;
    const action = actionRef.current;
    if (action) {
      action.paused = true;
      action.timeScale = 0;
      // Open in the middle of every pass, then close at the end.
      action.time = action.getClip().duration * (1 - open);
      action.getMixer().update(0);
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
    const revealTriggers = gsap.utils.toArray(".work-experience-section").map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    );

    const scrubTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      endTrigger: rightColumnRef.current,
      end: "bottom bottom",
      scrub: 3,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      revealTriggers.forEach((tween) => tween.scrollTrigger?.kill());
      scrubTrigger.kill();
    };
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
