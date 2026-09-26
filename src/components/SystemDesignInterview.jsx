import { useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiDatabase, FiLayers, FiRefreshCw, FiShield, FiZap } from "react-icons/fi";
import "../styles/SystemDesignInterview.css";

const questions = [
  { id: "queue", icon: FiLayers, title: "How should jobs enter the system?", options: [{ label: "RabbitMQ", hint: "Durable queue with acknowledgements", score: 3 }, { label: "Direct processing", hint: "Simple, but requests block on slow work", score: 0 }, { label: "Kafka", hint: "Great for streams and replayable events", score: 2 }] },
  { id: "data", icon: FiDatabase, title: "Where should job state live?", options: [{ label: "PostgreSQL", hint: "Consistent source of truth for task state", score: 3 }, { label: "In-memory only", hint: "Fast, but state disappears on restart", score: 0 }, { label: "Document store", hint: "Flexible schema for evolving payloads", score: 1 }] },
  { id: "recovery", icon: FiShield, title: "What happens when a worker fails?", options: [{ label: "Retry + DLQ", hint: "Retry safely, then isolate poison jobs", score: 3 }, { label: "Drop the job", hint: "Fast recovery with data loss", score: 0 }, { label: "Retry forever", hint: "Can create an invisible retry storm", score: 1 }] },
];

export default function SystemDesignInterview() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => questions.reduce((total, q) => total + (answers[q.id]?.score || 0), 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;

  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <section className="design-interview" id="design-interview">
      <div className="design-interview-heading">
        <span className="eyebrow">System Design Interview</span>
        <h2 className="h">Think like the architect.</h2>
        <p>Design a reliable job platform. Make the trade-offs an interviewer would ask about.</p>
      </div>

      <div className="interview-shell">
        <div className="interview-brief">
          <div><span className="brief-label">INTERVIEW PROMPT</span><h3>Design a platform that processes 1 million background jobs per day.</h3><p>It must survive worker failures, keep task state consistent, and scale without blocking API requests.</p></div>
          <div className="brief-signal"><FiZap /><span>{complete ? `${score}/9 design score` : `${Object.keys(answers).length}/3 decisions`}</span></div>
        </div>

        <div className="design-questions">
          {questions.map((question, index) => {
            const Icon = question.icon;
            return <article className={`design-question ${answers[question.id] ? "answered" : ""}`} key={question.id}>
              <div className="question-title"><span className="question-number">0{index + 1}</span><Icon /><h3>{question.title}</h3>{answers[question.id] && <FiCheck className="question-check" />}</div>
              <div className="design-options">{question.options.map((option) => <button className={answers[question.id]?.label === option.label ? "selected" : ""} key={option.label} onClick={() => { setAnswers((current) => ({ ...current, [question.id]: option })); setSubmitted(false); }}><strong>{option.label}</strong><span>{option.hint}</span></button>)}</div>
            </article>;
          })}
        </div>

        <div className="interview-footer">
          {submitted && <div className="interview-result"><strong>{score >= 8 ? "Strong production-minded design." : score >= 5 ? "Solid foundation, with trade-offs to refine." : "Good starting point. Reliability needs more attention."}</strong><span>{score >= 8 ? "You covered durability, consistency, and failure isolation." : "Try thinking about what happens when traffic, workers, or data stores fail."}</span></div>}
          <button className="interview-submit" disabled={!complete} onClick={() => setSubmitted(true)}>{submitted ? "Design evaluated" : "Evaluate my design"} <FiArrowRight /></button>
          <button className="interview-reset" onClick={reset} title="Reset interview"><FiRefreshCw /></button>
        </div>
      </div>
    </section>
  );
}
