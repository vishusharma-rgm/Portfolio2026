import { useRef } from "react";
import { motion } from "framer-motion";

// A button that gently pulls toward the cursor on hover — a small, premium
// touch used across SaaS/Awwwards sites instead of a plain hover state.
export default function MagneticButton({ as: As = "a", className, children, ...props }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const MotionTag = motion(As);

  return (
    <MotionTag
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.15s ease-out" }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
