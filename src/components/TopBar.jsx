import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/TopBar.css";

export default function TopBar({ soundOn, onToggleSound, darkMode, onToggleTheme }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const menuOpen = expanded || hovered;

  const close = () => setExpanded(false);

  return (
    <div
      className={`topbar ${menuOpen ? "is-expanded" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="left">
        <nav className="brand" aria-label="Primary navigation">
          <button className="brand-toggle" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
            {expanded ? <FiX className="brand-menu" /> : <FiMenu className="brand-menu" />}
            <span>{profile.name}.</span>
          </button>
          <span className="nav-dot" aria-hidden="true" />
          <div className="nav-links" aria-hidden={!menuOpen}>
            <a href="#skills" onClick={close}>Skills.</a>
            <a href="#projects" onClick={close}>Work.</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={close}>LinkedIn.</a>
            <a href={profile.github} target="_blank" rel="noreferrer" onClick={close}>Github.</a>
          </div>
        </nav>
      </div>
      <div className="right">
        <button className="icon-btn" onClick={onToggleSound} title={soundOn ? "Mute" : "Sound on"}>
          {soundOn ? <FiVolume2 /> : <FiVolumeX />}
        </button>
        <button className="icon-btn" onClick={onToggleTheme} title={darkMode ? "Light mode" : "Dark mode"}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </div>
  );
}
