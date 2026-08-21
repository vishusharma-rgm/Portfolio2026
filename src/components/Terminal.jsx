import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, projects, skillGroups } from "../data/portfolio";
import "../styles/Terminal.css";

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

export default function Terminal({ open, onClose, beep, onEasterEgg, onCoffee, onResume }) {
  const [lines, setLines] = useState([
    { type: "system", text: "Terminal ready. Type 'help' to see available commands." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const skillsFlat = skillGroups.map((g) => g.items.join(", ")).join(", ");
  const projectsText = projects
    .map((p, i) => `${i + 1}. ${p.name.padEnd(20)} — ${p.stack}`)
    .join("\n");

  const commands = {
    help: () => `Available commands:
  whoami        — who is ${profile.name}
  skills        — tech stack
  projects      — list of projects
  resume        — open resume
  contact       — get in touch
  coffee        — brew something
  clear         — clear the terminal
  sudo hire me  — ???`,
    whoami: () =>
      `${profile.name} — CS student, backend & distributed systems focus.\nCurrently building: queues, caches, and things that shouldn't fall over.`,
    skills: () => skillsFlat,
    projects: () => projectsText,
    resume: () => {
      onResume();
      return "Opening resume.pdf ...";
    },
    contact: () =>
      `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}`,
    coffee: () => {
      onCoffee();
      return "☕ brewing... here you go.";
    },
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "echo", text: raw }]);
    if (cmd === "") return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "sudo hire me") {
      setLines((prev) => [
        ...prev,
        { type: "out", text: "Access granted. Initiating contact protocol... \ud83c\udf89" },
      ]);
      onEasterEgg();
      beep(880, 0.12, 0.07, "triangle");
      return;
    }
    if (commands[cmd]) {
      const out = commands[cmd]();
      if (out) setLines((prev) => [...prev, { type: "out", text: out }]);
      beep(520, 0.04, 0.04);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "err", text: `command not found: ${cmd}  (try 'help')` },
      ]);
      beep(220, 0.08, 0.05, "sawtooth");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="term-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="term-box"
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            <div className="term-topbar">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
              <span className="title">{profile.name.toLowerCase()}@portfolio: ~</span>
              <span className="close" onClick={onClose}>
                close ✕
              </span>
            </div>
            <div className="term-body" ref={bodyRef}>
              {lines.map((l, i) => (
                <div key={i} className={`line ${l.type}`}>
                  {l.type === "echo" ? (
                    <>
                      <span className="prompt-sym">➜</span>{" "}
                      <span className="cmd-echo">{escapeHtml(l.text)}</span>
                    </>
                  ) : (
                    l.text
                  )}
                </div>
              ))}
            </div>
            <div className="term-input-row">
              <span className="prompt-sym">➜</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    run(value);
                    setValue("");
                  } else {
                    beep(300 + Math.random() * 80, 0.02, 0.02);
                  }
                }}
                autoComplete="off"
                spellCheck="false"
                placeholder="type 'help'"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
