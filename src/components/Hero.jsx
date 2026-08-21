import { motion } from "framer-motion";
import { FiLink, FiArrowRight } from "react-icons/fi";
import Mascot3D from "./Mascot3D";
import MagneticButton from "./MagneticButton";
import { profile } from "../data/portfolio";
import "../styles/Hero.css";

export default function Hero({ onResume, onOpenTerminal, darkMode }) {
  const [first, ...rest] = profile.role.split(" ");
  const restWord = rest.join(" ");

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-mascot"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mascot3D darkMode={darkMode} />
        </motion.div>

        <motion.h1
          className="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
        >
          <span className="hero-heading-serif">{first}</span>
          <span className="hero-heading-sans">{restWord}.</span>
        </motion.h1>

        <motion.p
          className="hero-blurb"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6 }}
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.6 }}
        >
          <MagneticButton as="a" className="btn btn-dark" href="#contact">
            Connect <FiLink />
          </MagneticButton>
          <MagneticButton as="a" className="btn btn-outline" href="#projects">
            See Work <FiArrowRight />
          </MagneticButton>
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.68, duration: 0.6 }}
        >
          {profile.name} also has interests in{" "}
          <strong>Distributed Systems, System Design and Backend Architecture.</strong>
        </motion.p>
      </div>
    </section>
  );
}
