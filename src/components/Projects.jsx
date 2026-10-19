import { useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/portfolio";
import "../styles/Projects.css";

function ProjectImage({ image, title, variant, live, onExternalLink }) {
  return (
    <div className={`project-image project-image-${variant}`} aria-label={`${title} preview`}>
      <img src={image} alt={`${title} application preview`} />
      <span className="project-image-shade" aria-hidden="true" />
      <span className="project-image-label">{title}</span>
      {live && (
        <button className="project-image-action" title={`Open ${title} live`} onClick={() => onExternalLink(live)}>
          <FiExternalLink />
          <span>Open live project</span>
        </button>
      )}
    </div>
  );
}

export default function Projects({ onExternalLink, onOpenTerminal }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const projectListRef = useRef(null);

  const tabs = ["Projects", "Case Studies", "Open Source"];

  const moveProjects = (direction) => {
    projectListRef.current?.scrollBy({
      left: direction * projectListRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  const renderComingSoon = (label, description) => (
    <div className="open-source-coming-soon">
      <span className="coming-soon-kicker">{label}</span>
      <h3>Coming soon.</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <span className="eyebrow">Selected work</span>
        <h2>Systems that do more than look good.</h2>
        <p>Production-minded full-stack projects built around reliability, collaboration, and useful experiences.</p>
      </div>

      <div className="project-tabs" aria-label="Project categories">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className={activeTab === "Terminal" ? "active" : ""} onClick={onOpenTerminal}>
          Terminal
          <span>NEW</span>
        </button>
      </div>

      {activeTab === "Case Studies" && renderComingSoon("CASE STUDIES", "Detailed project breakdowns, decisions, and outcomes will be published here soon.")}
      {activeTab === "Open Source" && renderComingSoon("OPEN SOURCE", "Public repositories, developer tooling, and build-in-public work are coming soon.")}
      {activeTab === "Projects" && <>
        <div className="project-carousel-controls" aria-label="Project carousel controls">
          <button type="button" onClick={() => moveProjects(-1)} aria-label="Show previous projects">
            <FiArrowLeft />
          </button>
          <span>Swipe or use arrows</span>
          <button type="button" onClick={() => moveProjects(1)} aria-label="Show next projects">
            <FiArrowRight />
          </button>
        </div>
        <div className="project-list" ref={projectListRef}>
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <ProjectImage image={project.image} title={project.name} variant={project.id} live={project.live} onExternalLink={onExternalLink} />
            <div className="project-card-footer">
              <div className="project-card-copy">
                <div className="project-card-heading"><h3>{project.name}</h3><span>{project.year}</span></div>
                <p>{project.outcome}</p>
                <div className="project-stack">{project.stack.join(" · ")}</div>
              </div>
              {project.live && <button className="project-open-link" onClick={() => onExternalLink(project.live)} aria-label={`Open ${project.name} live project`}><FiArrowUpRight /></button>}
            </div>
          </article>
        ))}
        </div>
      </>}
    </section>
  );
}
