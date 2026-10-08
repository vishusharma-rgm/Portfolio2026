import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
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
  const mixer = useMemo(() => new THREE.AnimationMixer(robot), [robot]);
  const action = useMemo(() => {
    const clip = animations[0];
    return clip ? mixer.clipAction(clip) : null;
  }, [animations, mixer]);

  useEffect(() => {
    if (!action) return;
    action.reset();
    action.play();
    action.paused = true;
    return () => {
      action.stop();
      mixer.stopAllAction();
    };
  }, [action, mixer]);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollProgress = Math.max(0, Math.min(1, progress));
    // The GLB clip already contains one complete open-close cycle.
    // Seek through that timeline once as the experience column scrolls.
    const animationProgress = scrollProgress;
    if (action) {
      // Keep the clip paused and use scroll as its only source of time.
      action.time = action.getClip().duration * animationProgress;
      mixer.update(0);
    }
  }, [action, mixer, progress]);

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
    }, sectionRef);

    const updateRobotProgress = () => {
      const section = sectionRef.current;
      const rightColumn = rightColumnRef.current;
      if (!section || !rightColumn) return;
      const pageTop = window.scrollY;
      const sectionTop = section.getBoundingClientRect().top + pageTop;
      const sectionEnd = rightColumn.getBoundingClientRect().bottom + pageTop - window.innerHeight;
      const range = Math.max(1, sectionEnd - sectionTop);
      setProgress(Math.max(0, Math.min(1, (pageTop - sectionTop) / range)));
    };

    updateRobotProgress();
    window.addEventListener("scroll", updateRobotProgress, { passive: true });
    window.addEventListener("resize", updateRobotProgress);

    return () => {
      window.removeEventListener("scroll", updateRobotProgress);
      window.removeEventListener("resize", updateRobotProgress);
      context.revert();
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
