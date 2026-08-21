import { useEffect, useState, useCallback } from "react";
import BootSequence from "./components/BootSequence";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Terminal from "./components/Terminal";
import { ConfettiCanvas, SteamBurst, ExitVeil, FileFlash } from "./components/Effects";
import { useSound } from "./hooks/useSound";
import { profile } from "./data/portfolio";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [steamKey, setSteamKey] = useState(0);
  const [fileFlashKey, setFileFlashKey] = useState(0);
  const [exitActive, setExitActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { enabled: soundOn, toggle: toggleSound, beep } = useSound();

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const openResume = useCallback(() => {
    beep(700, 0.1, 0.05, "square");
    setFileFlashKey((k) => k + 1);
    setTimeout(() => window.open(profile.resume, "_blank"), 420);
  }, [beep]);

  const handleExternalLink = useCallback(
    (url) => {
      setExitActive(true);
      beep(220, 0.15, 0.05, "sawtooth");
      setTimeout(() => {
        window.open(url, "_blank");
        setExitActive(false);
      }, 380);
    },
    [beep]
  );

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} beep={beep} />}

      <TopBar
        soundOn={soundOn}
        onToggleSound={toggleSound}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((value) => !value)}
      />

      <Hero onOpenTerminal={() => setTermOpen(true)} onResume={openResume} darkMode={darkMode} />

      <Skills />
      <WorkExperience />
      <Projects onExternalLink={handleExternalLink} />
      <Contact onExternalLink={handleExternalLink} onResume={openResume} />

      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        beep={beep}
        onEasterEgg={() => setConfettiKey((k) => k + 1)}
        onCoffee={() => setSteamKey((k) => k + 1)}
        onResume={openResume}
      />

      <ConfettiCanvas triggerKey={confettiKey} />
      <SteamBurst triggerKey={steamKey} />
      <ExitVeil active={exitActive} />
      <FileFlash triggerKey={fileFlashKey} />
    </>
  );
}
