import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import "../styles/About.css";

export default function About() {
  return (
    <section className="about-section" id="about">
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        01 — About
      </motion.div>
      <motion.h2
        className="h"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        Fresher on paper, systems-minded in practice.
      </motion.h2>
      <div className="about-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p>
            I'm {profile.name} — a computer science student who spends more time inside
            distributed systems and backend architecture than most people spend on their
            phones. I like the parts of engineering that don't show up on a landing page:
            queues that don't drop jobs, caches that stay consistent under load, retries
            that actually recover.
          </p>
          <p>
            Still early in the journey, but I build like reliability matters — because
            eventually, it will. Every project below was an excuse to learn how real
            systems break, and how to stop them from breaking.
          </p>
        </motion.div>
        <motion.div
          className="terminal-mini"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
        >
          <div>
            <span className="k">$</span> cat {profile.name.toLowerCase()}.status
          </div>
          <div>
            role: <span className="k">CS Student / Fresher</span>
          </div>
          <div>
            focus: <span className="k">Backend, Distributed Systems</span>
          </div>
          <div>
            currently: <span className="k">shipping side projects</span>
          </div>
          <div>
            availability: <span className="k">open to opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
