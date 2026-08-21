import { useEffect, useMemo, useRef, useState } from "react";
import { DiJava, DiJavascript1, DiMongodb, DiNodejsSmall, DiPython, DiReact } from "react-icons/di";
import {
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiGithub,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiRabbitmq,
  SiRedis,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { FiCode, FiCpu, FiGitBranch, FiServer } from "react-icons/fi";
import "../styles/Skills.css";

const scatterIcons = [
  { label: "Java", mark: "J", color: "#f89820", bg: "#1e1e1e" },
  { label: "Spring", mark: "S", color: "#6db33f", bg: "#1e1e1e" },
  { label: "Postgres", mark: "P", color: "#9fc2de", bg: "#1e1e1e" },
  { label: "RabbitMQ", mark: "R", color: "#ff6600", bg: "#1e1e1e" },
  { label: "TypeScript", mark: "TS", color: "#ffffff", bg: "#3178c6" },
  { label: "JavaScript", mark: "JS", color: "#252525", bg: "#f4df45" },
  { label: "React", mark: "R", color: "#16d9ff", bg: "#1e1e1e" },
  { label: "Redis", mark: "R", color: "#dc382d", bg: "#1e1e1e" },
  { label: "Docker", mark: "D", color: "#2496ed", bg: "#1e1e1e" },
  { label: "GitHub", mark: "GH", color: "#ffffff", bg: "#1e1e1e" },
  { label: "VS Code", mark: "</>", color: "#22a7f2", bg: "#1e1e1e" },
  { label: "Node", mark: "N", color: "#8cc84b", bg: "#1e1e1e" },
  { label: "Mongo", mark: "M", color: "#4faa41", bg: "#1e1e1e" },
];

const desktopPositions = [
  { x: -500, y: 0 },
  { x: 650, y: 100 },
  { x: 600, y: -50 },
  { x: -600, y: -150 },
  { x: -600, y: 250 },
  { x: 100, y: -250 },
  { x: -400, y: -300 },
  { x: 500, y: 200 },
  { x: -300, y: 0 },
  { x: 300, y: 0 },
  { x: 250, y: 300 },
  { x: 550, y: -300 },
  { x: -250, y: 250 },
];

const mobilePositions = [
  { x: -100, y: 120 },
  { x: 150, y: 110 },
  { x: 120, y: -150 },
  { x: -120, y: -275 },
  { x: 0, y: 325 },
  { x: 10, y: -280 },
  { x: -100, y: -150 },
  { x: 5, y: 150 },
  { x: -150, y: 300 },
  { x: 150, y: 380 },
  { x: 125, y: -360 },
  { x: -150, y: -370 },
  { x: 100, y: 250 },
];

const marqueeIcons = [
  { name: "Java", icon: DiJava, color: "#f89820" },
  { name: "C++", icon: SiCplusplus, color: "#659ad2" },
  { name: "Python", icon: DiPython, color: "#ffe05d" },
  { name: "JavaScript", icon: DiJavascript1, color: "#252525", className: "js" },
  { name: "SQL", icon: FiServer, color: "#ffffff" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Node.js", icon: DiNodejsSmall, color: "#8cc84b" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
  { name: "React", icon: DiReact, color: "#16d9ff" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", className: "next" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#9fc2de" },
  { name: "MongoDB", icon: DiMongodb, color: "#4faa41" },
  { name: "Redis", icon: SiRedis, color: "#dc382d" },
  { name: "RabbitMQ", icon: SiRabbitmq, color: "#ff6600" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Git", icon: FiGitBranch, color: "#ff9466" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37" },
  { name: "VS Code", icon: FiCode, color: "#22a7f2" },
  { name: "CS", icon: FiCpu, color: "#ff9466" },
  { name: "REST", icon: FiCode, color: "#ffffff" },
];

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

function CanvasSkills() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const trail = useRef([]);
  const order = useRef([]);
  const returning = useRef(false);
  const mode = useRef("waiting");
  const startTime = useRef(0);
  const lastTime = useRef(0);
  const jitterTime = useRef(0);
  const raf = useRef(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 600);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const scale = isMobile ? 1 : Math.max(1, window.innerWidth / 1400);
    const positions = (isMobile ? mobilePositions : desktopPositions).map((pos) => ({
      x: isMobile ? pos.x : pos.x * scale,
      y: pos.y,
    }));

    particles.current = positions.map((pos) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      restX: pos.x,
      restY: pos.y,
      baseRestX: pos.x,
      baseRestY: pos.y,
      scale: 0,
    }));
    mode.current = "entering";
    startTime.current = performance.now();
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapRef.current;
    if (!canvas || !wrapper) return;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrapper || !ctx) return;

    const tile = isMobile ? 60 : 80;
    const radius = isMobile ? 12 : 18;
    const stiffness = 0.08;
    const damping = 0.82;
    const follow = 0.14;
    const maxTrail = 160;
    const trailGap = 7;
    const entranceDuration = 500;
    const entranceStagger = 75;

    const drawRoundRect = (x, y, width, height, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + height, r);
      ctx.arcTo(x + width, y + height, x, y + height, r);
      ctx.arcTo(x, y + height, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
    };

    const tick = (now) => {
      const delta = lastTime.current ? now - lastTime.current : 16;
      lastTime.current = now;
      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;
      const items = particles.current;

      if (mode.current === "entering") {
        const elapsed = now - startTime.current;
        let done = true;
        items.forEach((item, index) => {
          const local = elapsed - index * entranceStagger;
          if (local < 0) {
            done = false;
            return;
          }
          const progress = Math.min(local / entranceDuration, 1);
          if (progress < 1) done = false;
          const eased = easeOutBack(progress);
          item.x = item.baseRestX * eased;
          item.y = item.baseRestY * eased;
          item.scale = progress < 0.5 ? progress * 3 : 1.5 - (progress - 0.5);
        });
        if (done) {
          mode.current = "idle";
          items.forEach((item) => {
            item.x = item.baseRestX;
            item.y = item.baseRestY;
            item.scale = 1;
          });
        }
      }

      if (mode.current === "idle") {
        if (pointer.current.active && !returning.current) {
          trail.current.push({ x: pointer.current.x, y: pointer.current.y });
          if (trail.current.length > maxTrail) trail.current.shift();
          if (order.current.length === 0 && trail.current.length > 0) {
            order.current = items
              .map((item, index) => ({ index, dist: Math.hypot(item.x - pointer.current.x, item.y - pointer.current.y) }))
              .sort((a, b) => a.dist - b.dist)
              .map((item) => item.index);
          }
          order.current.forEach((itemIndex, queueIndex) => {
            const point = trail.current[trail.current.length - 1 - queueIndex * trailGap];
            if (!point) return;
            const item = items[itemIndex];
            item.x += (point.x - item.x) * follow;
            item.y += (point.y - item.y) * follow;
            item.vx = 0;
            item.vy = 0;
          });
        } else if (returning.current) {
          items.forEach((item) => {
            item.vx += (item.restX - item.x) * stiffness;
            item.vy += (item.restY - item.y) * stiffness;
            item.vx *= damping;
            item.vy *= damping;
            item.x += item.vx;
            item.y += item.vy;
          });
          jitterTime.current += delta;
          if (jitterTime.current > 2000) {
            jitterTime.current = 0;
            items.forEach((item) => {
              item.restX = item.baseRestX + Math.random() * 20 - 10;
              item.restY = item.baseRestY + Math.random() * 20 - 10;
            });
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(cssW / 2, cssH / 2);

      items.forEach((item, index) => {
        if (item.scale <= 0) return;
        const icon = scatterIcons[index % scatterIcons.length];
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.scale(item.scale, item.scale);
        ctx.shadowColor = "rgba(0,0,0,.24)";
        ctx.shadowBlur = 22;
        ctx.shadowOffsetY = 12;
        drawRoundRect(-tile / 2, -tile / 2, tile, tile, radius);
        ctx.fillStyle = icon.bg;
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.font = `800 ${icon.mark.length > 2 ? tile * 0.22 : tile * 0.34}px DM Sans`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = icon.color;
        ctx.fillText(icon.mark, 0, 2);
        ctx.restore();
      });

      ctx.restore();
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [isMobile]);

  const handleMove = (event) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointer.current.x = event.clientX - rect.left - rect.width / 2;
    pointer.current.y = event.clientY - rect.top - rect.height / 2;
    pointer.current.active = true;
    returning.current = false;
  };

  const handleLeave = () => {
    pointer.current.active = false;
    order.current = [];
    trail.current = [];
  };

  const handleClick = () => {
    pointer.current.active = false;
    returning.current = true;
    order.current = [];
    trail.current = [];
  };

  return (
    <div className="skill-scatter" ref={wrapRef} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={handleClick}>
      <p className="skill-scatter-center">
        Always Building,
        <br />
        Always Scaling.
      </p>
      <canvas ref={canvasRef} aria-label="Interactive skill icons" />
    </div>
  );
}

function MarqueeRow({ reverse = false }) {
  const row = useMemo(() => [...marqueeIcons, ...marqueeIcons], []);

  return (
    <div className={`marquee-row ${reverse ? "is-reverse" : ""}`}>
      <div className="marquee-track">
        {row.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className={`marquee-tile ${item.className || ""}`} key={`${item.name}-${index}`} title={item.name}>
              <Icon color={item.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <CanvasSkills />

      <div className="downloads-heading">
        <span>Reliable</span> Backend Systems
      </div>

      <div className="skills-marquee" aria-label="Technology stack marquee">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
