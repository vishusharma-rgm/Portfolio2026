import { useState } from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
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

  const tabs = ["Projects", "Case Studies", "Open Source"];

  const renderCaseStudies = () => (
    <div className="case-study-grid">
      {projects.map((project, index) => (
        <article className="case-study" key={project.id}>
          <span className="case-study-index">0{index + 1} / CASE STUDY</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span className="case-study-outcome"><strong>Focus</strong> {project.focus}</span>
          <div className="case-study-meta">
            <span>Built with</span>
            <strong>{project.stack.join(" · ")}</strong>
          </div>
          {project.live && (
            <button className="case-study-link" onClick={() => onExternalLink(project.live)}>
              Open live project <FiExternalLink />
            </button>
          )}
        </article>
      ))}
    </div>
  );

  const renderOpenSource = () => (
    <div className="open-source-coming-soon">
      <span className="coming-soon-kicker">OPEN SOURCE / BUILDING IN PUBLIC</span>
      <h3>Useful systems, shared openly.</h3>
      <p>My public work sits at the intersection of system reliability, real-time collaboration, and developer-focused tools.</p>
      <div className="proof-grid">
        <span><strong>01</strong> Distributed systems</span>
        <span><strong>02</strong> Realtime products</span>
        <span><strong>03</strong> Developer tooling</span>
      </div>
      <button onClick={() => onExternalLink("https://github.com/vishusharma-rgm")}>Explore GitHub <FiExternalLink /></button>
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

      {activeTab === "Case Studies" && renderCaseStudies()}
      {activeTab === "Open Source" && renderOpenSource()}
      {activeTab === "Projects" && <div className="project-list">
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
      </div>}
    </section>
  );
}
