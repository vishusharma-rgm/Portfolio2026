import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperiences } from "../data/portfolio";
import "../styles/WorkExperience.css";

gsap.registerPlugin(ScrollTrigger);

function PartsAssemblingModel({ progress }) {
  const groupRef = useRef(null);
  const { scene, animations } = useGLTF("/assets/3d/parts-assembling.glb");
  const { actions } = useAnimations(animations, groupRef);
  const actionRef = useRef(null);

  useEffect(() => {
    const action = actions["Take 001"] || Object.values(actions)[0];
    if (!action) return;
    action.play();
    action.paused = true;
    actionRef.current = action;
    return () => action.stop();
  }, [actions]);

  useFrame(() => {
    const action = actionRef.current;
    if (action) {
      const duration = action.getClip().duration;
      const nextTime = duration * progress;
      if (Math.abs(action.time - nextTime) > 0.01) action.time = nextTime;
    }
  });

  return <primitive ref={groupRef} object={scene} />;
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
  const leftColumnRef = useRef(null);
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
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => setProgress(self.progress),
    });

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColumnRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    return () => {
      revealTriggers.forEach((tween) => tween.scrollTrigger?.kill());
      scrubTrigger.kill();
      pinTrigger.kill();
    };
  }, []);

  return (
    <section className="work-experience-main-wrapper" id="experience" ref={sectionRef}>
      <h1 className="fixed-heading">
        <span className="orange">Destructuring </span>
        <span>My Work Experience.</span>
      </h1>

      <div className="left-column" ref={leftColumnRef}>
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

      <div className="right-column">
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
