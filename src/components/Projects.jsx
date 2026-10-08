import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
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
      <span className="coming-soon-kicker">OPEN SOURCE</span>
      <h3>Coming soon.</h3>
      <p>Reusable backend utilities, distributed systems experiments, and developer tools are being prepared for release.</p>
      <button onClick={() => onExternalLink("https://github.com/vishusharma-rgm")}>Watch GitHub <FiExternalLink /></button>
    </div>
  );

  return (
    <section className="projects-section" id="projects">
      <h2>Find My Work</h2>

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
          </article>
        ))}
      </div>}
    </section>
  );
}
