import { useEffect, useRef } from "react";
import "../styles/SkyBackground.css";

const PETAL_COUNT = 16;

function seededPetals() {
  return Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    duration: 14 + Math.random() * 10,
    delay: -Math.random() * 20,
    drift: (Math.random() - 0.5) * 160,
    rotate: Math.random() * 360,
    hue: Math.random() > 0.5 ? "petal-pink" : "petal-orange",
  }));
}

export default function SkyBackground() {
  const cloudsRef = useRef(null);
  const petals = useRef(seededPetals()).current;

  useEffect(() => {
    const onMove = (e) => {
      if (!cloudsRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cloudsRef.current.style.transform = `translate3d(${x * -14}px, ${y * -8}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="sky-bg" aria-hidden="true">
      <div className="sky-gradient" />

      <div className="sky-clouds" ref={cloudsRef}>
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
        <div className="cloud-wash" />
      </div>

      <div className="petal-layer">
        {petals.map((p) => (
          <span
            key={p.id}
            className={`petal ${p.hue}`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.75,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rotate}deg`,
            }}
          />
        ))}
      </div>

      <div className="sky-fade-to-cream" />
    </div>
  );
}
