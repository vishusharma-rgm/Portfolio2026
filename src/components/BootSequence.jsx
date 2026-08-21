import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bootLines } from "../data/portfolio";
import "../styles/BootSequence.css";

export default function BootSequence({ onDone, beep }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState([]);
  const [flash, setFlash] = useState(false);
  const doneCalled = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    setShown([]);

    const typeNext = (i) => {
      if (cancelled) return;
      if (i >= bootLines.length) {
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          setFlash(true);
          beep && beep(500, 0.1, 0.04, "square");
          timeoutId = setTimeout(() => {
            if (!cancelled) setVisible(false);
          }, 90);
          timeoutId = setTimeout(() => {
            if (!cancelled && !doneCalled.current) {
              doneCalled.current = true;
              onDone && onDone();
            }
          }, 500);
        }, 400);
        return;
      }
      setShown((prev) => [...prev, bootLines[i]]);
      timeoutId = setTimeout(() => typeNext(i + 1), 220 + Math.random() * 160);
    };

    timeoutId = setTimeout(() => typeNext(0), 300);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6 }}
        >
          <div className="scanlines" />
          <div className="boot-lines">
            {shown.map((line, idx) => (
              <motion.div
                key={idx}
                className="boot-ln"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {line}
                {idx === shown.length - 1 && <span className="boot-cursor" />}
              </motion.div>
            ))}
          </div>
          <div className={`glitch-flash ${flash ? "on" : ""}`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
