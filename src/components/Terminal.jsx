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
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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

  const skillsFlat = skillGroups.map((g) => `${g.title}: ${g.items.map((item) => item.name).join(", ")}`).join("\n");
  const projectsText = projects
    .map((p, i) => `${i + 1}. ${p.name.padEnd(20)} — ${p.stack}`)
    .join("\n");

  const commands = {
    help: () => `Available commands:
  whoami        — who is ${profile.name}
  skills        — tech stack
  stack         — grouped engineering stack
  projects      — list of projects
  case-study    — architecture case studies
  open-source   — open source focus
  status        — current build focus
  tree          — portfolio structure
  resume        — open resume
  contact       — get in touch
  coffee        — brew something
  clear         — clear the terminal
  sudo hire me  — ???`,
    whoami: () =>
      `${profile.name} — CS student, backend & distributed systems focus.\nCurrently building: queues, caches, and things that shouldn't fall over.`,
    skills: () => skillsFlat,
    stack: () => skillsFlat,
    projects: () => projectsText,
    "case-study": () => projects.map((p) => `${p.name}\n  problem: ${p.description}\n  stack: ${p.stack.join(", ")}\n  result: scalable backend workflow with measurable reliability gains.`).join("\n\n"),
    "open-source": () => `Focus areas:\n  • distributed systems and queue workers\n  • Java/Spring Boot backend patterns\n  • WebSocket and CRDT collaboration\n  • reusable API, caching, and observability tooling\n\nGitHub: ${profile.github}`,
    status: () => `BUILD: online\nFOCUS: backend systems + distributed workflows\nSTACK: Java, Spring Boot, PostgreSQL, Redis, RabbitMQ\nMODE: shipping reliable systems`,
    tree: () => `portfolio/\n├── hero/\n├── experience/\n├── projects/\n├── terminal/\n└── contact/`,
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
    if (cmd) setHistory((prev) => [...prev.slice(-19), raw]);
    setHistoryIndex(-1);
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
              <div className="term-status"><span /> online · v2.0</div>
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
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHistoryIndex((index) => {
                      const next = Math.max(0, index < 0 ? history.length - 1 : index - 1);
                      setValue(history[next] || "");
                      return next;
                    });
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHistoryIndex((index) => {
                      const next = Math.min(history.length, index + 1);
                      setValue(history[next] || "");
                      return next;
                    });
                  } else {
                    beep(300 + Math.random() * 80, 0.02, 0.02);
                  }
                }}
                autoComplete="off"
                spellCheck="false"
                placeholder="type 'help'"
              />
            </div>
            <div className="term-quick-actions">
              {['status', 'stack', 'case-study', 'open-source', 'tree'].map((command) => (
                <button key={command} onClick={() => run(command)}>{command}</button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
