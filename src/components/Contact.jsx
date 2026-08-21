import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import "../styles/Contact.css";

export default function Contact({ onExternalLink, onResume }) {
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setDockVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="contact-section" id="contact">
        <motion.h2
          className="h center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's build something people want to use.
        </motion.h2>
      </section>

      <nav className={`bottom-dock ${dockVisible ? "is-visible" : ""}`} aria-label="Quick links">
        <a href={profile.linkedin} onClick={(e) => {
          e.preventDefault();
          onExternalLink(profile.linkedin);
        }}>LinkedIn.</a>
        <a href={profile.github} onClick={(e) => {
          e.preventDefault();
          onExternalLink(profile.github);
        }}>Github.</a>
        <a href={`mailto:${profile.email}`} onClick={(e) => {
          e.preventDefault();
          onExternalLink(`mailto:${profile.email}`);
        }}>Email.</a>
        <a href={profile.resume} onClick={(e) => {
          e.preventDefault();
          onResume();
        }}>llms.txt</a>
      </nav>
    </>
  );
}
