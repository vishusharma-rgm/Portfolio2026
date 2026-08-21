import { useEffect, useRef } from "react";
import "../styles/Effects.css";

export function ConfettiCanvas({ triggerKey }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!triggerKey) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const colors = ["#d9a256", "#6fb8c9", "#7ee8b0", "#e8697e", "#f0b95c"];
    const particles = Array.from({ length: 120 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1.6) * 14,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      life: 0,
    }));
    let frame = 0;
    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particles.forEach((p) => {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 6;
        p.life++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.life / 90);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      if (frame < 100) raf = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [triggerKey]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}

export function SteamBurst({ triggerKey }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!triggerKey) return;
    const box = boxRef.current;
    if (!box) return;
    box.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.style.left = Math.random() * 20 - 10 + "px";
      s.style.animationDelay = i * 0.08 + "s";
      box.appendChild(s);
    }
    box.classList.add("show");
    const t = setTimeout(() => box.classList.remove("show"), 1600);
    return () => clearTimeout(t);
  }, [triggerKey]);

  return <div ref={boxRef} className="steam-burst" />;
}

export function ExitVeil({ active }) {
  return <div className={`exit-veil ${active ? "on" : ""}`} />;
}

export function FileFlash({ triggerKey }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!triggerKey || !ref.current) return;
    ref.current.classList.remove("on");
    void ref.current.offsetWidth;
    ref.current.classList.add("on");
  }, [triggerKey]);
  return <div ref={ref} className="file-flash" />;
}
