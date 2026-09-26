import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiCpu, FiDatabase, FiPlay, FiRefreshCw, FiServer, FiWifi } from "react-icons/fi";
import "../styles/SystemsLab.css";

const concepts = {
  Queue: { icon: FiServer, copy: "Buffers traffic and keeps workers from being overwhelmed." },
  Cache: { icon: FiDatabase, copy: "Serves hot data quickly while reducing database pressure." },
  Realtime: { icon: FiWifi, copy: "Pushes state changes to connected clients with low latency." },
  Worker: { icon: FiCpu, copy: "Processes jobs independently so slow work never blocks requests." },
};

const journeySteps = ["API", "Queue", "Worker", "Cache", "Database"];

export default function SystemsLab() {
  const [concept, setConcept] = useState("Queue");
  const [workers, setWorkers] = useState(4);
  const [jobs, setJobs] = useState(500);
  const [retries, setRetries] = useState(2);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (activeStep < 0) return undefined;
    if (activeStep >= journeySteps.length - 1) return undefined;
    const timer = setTimeout(() => setActiveStep((step) => step + 1), 650);
    return () => clearTimeout(timer);
  }, [activeStep]);

  const metrics = useMemo(() => {
    const throughput = workers * 118;
    const latency = Math.max(42, Math.round(920 / workers + jobs / 100 - retries * 8));
    const recovery = Math.min(99, 88 + retries * 4);
    return { throughput, latency, recovery };
  }, [workers, jobs, retries]);

  const selected = concepts[concept];
  const ConceptIcon = selected.icon;

  return (
    <section className="systems-lab" id="systems-lab">
      <div className="systems-lab-heading">
        <span className="eyebrow">Interactive Systems Lab</span>
        <h2 className="h">See the systems behind the work.</h2>
        <p>Small experiments that make backend architecture tangible.</p>
      </div>

      <div className="systems-lab-grid">
        <article className="lab-panel robot-debug-panel">
          <div className="lab-panel-top"><span>01 / Robot Debug</span><FiActivity /></div>
          <div className="robot-diagram" aria-label="Interactive robot system diagram">
            <div className="robot-core"><span /><span /><span /></div>
            {Object.keys(concepts).map((name, index) => (
              <button
                className={`robot-node node-${index} ${concept === name ? "selected" : ""}`}
                key={name}
                onClick={() => setConcept(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="lab-detail"><ConceptIcon /><div><strong>{concept}</strong><p>{selected.copy}</p></div></div>
        </article>

        <article className="lab-panel design-lab-panel">
          <div className="lab-panel-top"><span>02 / System Design</span><FiServer /></div>
          <div className="control-row"><label>Workers <output>{workers}</output></label><input type="range" min="1" max="12" value={workers} onChange={(e) => setWorkers(Number(e.target.value))} /></div>
          <div className="control-row"><label>Queued jobs <output>{jobs}</output></label><input type="range" min="100" max="1000" step="100" value={jobs} onChange={(e) => setJobs(Number(e.target.value))} /></div>
          <div className="control-row"><label>Retries <output>{retries}</output></label><input type="range" min="0" max="5" value={retries} onChange={(e) => setRetries(Number(e.target.value))} /></div>
          <div className="metric-grid"><div><strong>{metrics.throughput}</strong><span>jobs/min</span></div><div><strong>{metrics.latency}ms</strong><span>est. latency</span></div><div><strong>{metrics.recovery}%</strong><span>recovery</span></div></div>
        </article>

        <article className="lab-panel journey-panel">
          <div className="lab-panel-top"><span>03 / Request Journey</span><FiRefreshCw /></div>
          <div className="journey-track">
            {journeySteps.map((step, index) => <div className={`journey-step ${index <= activeStep ? "passed" : ""}`} key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}
          </div>
          <button className="journey-run" onClick={() => setActiveStep(0)}><FiPlay /> {activeStep >= 0 && activeStep < journeySteps.length - 1 ? "Request in flight" : "Run a request"}</button>
        </article>
      </div>
    </section>
  );
}
