import { useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "../data/portfolio";
import "../styles/Projects.css";

function ProjectImage({ type, title }) {
  return (
    <div className={`project-image project-image-${type}`} aria-label={`${title} preview`}>
      {type === "taskforge" && (
        <>
          <span className="queue-line queue-line-a" />
          <span className="queue-line queue-line-b" />
          <span className="queue-line queue-line-c" />
          <div className="queue-core">TF</div>
          <h3>Distributed Job Processing.</h3>
          <p>RabbitMQ workers, Redis cache, retry recovery, and observability dashboards.</p>
        </>
      )}

      {type === "reviewsync" && (
        <>
          <span className="sync-node sync-a" />
          <span className="sync-node sync-b" />
          <span className="sync-node sync-c" />
          <span className="sync-node sync-d" />
          <h3>Review together, conflict-free.</h3>
          <p>CRDT + WebSocket sync for collaborative code review.</p>
        </>
      )}

      {type === "agentic" && (
        <>
          <span className="agent-orbit orbit-a" />
          <span className="agent-orbit orbit-b" />
          <span className="agent-core">AI</span>
          <h3>Autonomous Task Executor.</h3>
          <p>Tool-using reasoning loop with async orchestration.</p>
        </>
      )}
    </div>
  );
}

export default function Projects({ onExternalLink, onOpenTerminal }) {
  const [activeTab, setActiveTab] = useState("Projects");

  const tabs = ["Projects", "Case Studies", "Open Source"];

  const renderCaseStudies = () => (
    <div className="open-source-coming-soon">
      <span className="coming-soon-kicker">CASE STUDIES</span>
      <h3>Coming soon.</h3>
      <p>Deep dives into architecture decisions, scaling trade-offs, system diagrams, and measurable project outcomes are being written.</p>
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
            <ProjectImage type={project.imageType} title={project.name} />
            <div className="project-card-footer">
              <h3>{project.name}</h3>
              <div className="project-links">
                <button title={`${project.name} GitHub`} onClick={() => onExternalLink(project.github)}>
                  <FiGithub />
                  <span>GitHub</span>
                </button>
                {project.live && (
                  <button title={`${project.name} Live`} onClick={() => onExternalLink(project.live)}>
                    <FiExternalLink />
                    <span>Live</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>}
    </section>
  );
}
