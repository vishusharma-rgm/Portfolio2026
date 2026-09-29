import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/Contact.css";

export default function Contact({ onExternalLink, onResume }) {
  const [dockVisible, setDockVisible] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setDockVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="contact-section" id="contact">
        <motion.div className="contact-inner" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="contact-layout">
            <div className="contact-copy">
              <h2 className="h">Let's make something useful.</h2>
              <p className="lead">Have an idea, a rough brief, or a backend problem that needs untangling? Send it over. I enjoy making software simpler, faster, and more dependable.</p>
              <a className="contact-email" href={`mailto:${profile.email}`} onClick={(e) => { e.preventDefault(); onExternalLink(`mailto:${profile.email}`); }}><FiMail /> Start with an email <FiArrowUpRight /></a>
              <div className="contact-actions"><a href={profile.resume} onClick={(e) => { e.preventDefault(); onResume(); }}><FiDownload /> Resume</a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div>
            </div>
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const subject = encodeURIComponent(`Engineering conversation with ${form.get("name")}`); const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`); setSent(true); onExternalLink(`mailto:${profile.email}?subject=${subject}&body=${body}`); }}>
              <div className="contact-form-row"><label><span>Your name</span><input name="name" type="text" placeholder="How should I address you?" required /></label><label><span>Reply-to email</span><input name="email" type="email" placeholder="you@example.com" required /></label></div>
              <label><span>Project brief</span><textarea name="message" placeholder="What are you trying to make better?" rows="6" required /></label>
              <button className="contact-submit" type="submit">{sent ? "Opening your email app" : "Send the brief"}<FiSend /></button>
            </form>
          </div>
        </motion.div>
      </section>

      <nav className={`bottom-dock ${dockVisible ? "is-visible" : ""}`} aria-label="Quick links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={(e) => {
          e.preventDefault();
          onExternalLink(profile.linkedin);
        }}>LinkedIn.</a>
        <a href={profile.github} target="_blank" rel="noreferrer" onClick={(e) => {
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
        }}>Resume.</a>
      </nav>
    </>
  );
}
