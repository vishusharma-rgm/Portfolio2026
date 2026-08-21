export const profile = {
  name: "Vishu Sharma",
  role: "Backend Engineer",
  tagline: "Backend Engineer • Java Developer • Distributed Systems Builder",
  blurb:
    "Vishu builds reliable backend systems, distributed job queues, real-time collaboration tools, and agentic task platforms with a strong focus on scalability, consistency, and clean engineering.",
  email: "sharmavansh1809@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishu-kush-293a0432a/",
  github: "https://github.com/vishusharma-rgm",
  resume: "https://drive.google.com/file/d/1nhzKmE2W5BJ3T9O-HbIMUzMZkOClIr7d/view?usp=drivesdk",
};

// proficiency is 0-100, used to drive the animated bar in the skills grid
export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    items: [
      { name: "Java", level: 92, icon: "java" },
      { name: "C++", level: 78, icon: "cpp" },
      { name: "Python", level: 75, icon: "python" },
      { name: "JavaScript", level: 80, icon: "javascript" },
      { name: "SQL", level: 82, icon: "database" },
    ],
  },
  {
    title: "Frameworks",
    icon: "layers",
    items: [
      { name: "Spring Boot", level: 90, icon: "spring" },
      { name: "Node.js", level: 78, icon: "nodejs" },
      { name: "Express.js", level: 76, icon: "express" },
      { name: "React.js", level: 80, icon: "react" },
      { name: "Next.js", level: 72, icon: "nextjs" },
    ],
  },
  {
    title: "Infra & Data",
    icon: "server",
    items: [
      { name: "PostgreSQL", level: 85, icon: "postgresql" },
      { name: "MongoDB", level: 74, icon: "mongodb" },
      { name: "Redis", level: 82, icon: "redis" },
      { name: "RabbitMQ", level: 80, icon: "rabbitmq" },
      { name: "Docker", level: 76, icon: "docker" },
    ],
  },
  {
    title: "Fundamentals",
    icon: "cpu",
    items: [
      { name: "Data Structures & Algorithms", level: 88, icon: "algorithm" },
      { name: "OOP & Software Design", level: 86, icon: "design" },
      { name: "Operating Systems", level: 78, icon: "os" },
      { name: "Concurrency & Multi-threading", level: 80, icon: "thread" },
      { name: "Networking", level: 75, icon: "network" },
    ],
  },
  {
    title: "Developer Tools",
    icon: "tool",
    items: [
      { name: "Git", level: 84, icon: "git" },
      { name: "GitHub", level: 86, icon: "github" },
      { name: "REST APIs", level: 88, icon: "api" },
      { name: "WebSockets", level: 80, icon: "websocket" },
      { name: "Postman", level: 78, icon: "postman" },
      { name: "VS Code", level: 82, icon: "vscode" },
    ],
  },
];

export const projects = [
  {
    id: "taskforge",
    name: "TaskForge",
    imageType: "taskforge",
    year: "2026",
    stack: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ", "Redis", "React.js"],
    description:
      "Architected a distributed job processing system with RabbitMQ worker queues, horizontal scaling, fault-tolerant retry/recovery, Redis caching, and real-time observability dashboards.",
    github: "https://github.com/vishusharma-rgm",
    live: "https://github.com/vishusharma-rgm",
    accent: "#ff5e2b",
  },
  {
    id: "reviewsync",
    name: "ReviewSync",
    imageType: "reviewsync",
    year: "2026",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets", "Yjs CRDT"],
    description:
      "Designed a scalable real-time collaborative code review platform using CRDT conflict resolution, WebSocket sync, inline commenting, RBAC, and suggestion workflows.",
    github: "https://github.com/vishusharma-rgm",
    live: "https://github.com/vishusharma-rgm",
    accent: "#3178c6",
  },
  {
    id: "agentic-executor",
    name: "Agentic Task Executor",
    imageType: "agentic",
    year: "2026",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Grok API"],
    description:
      "Architected an autonomous LLM agent backend with a tool-using reasoning loop, async task orchestration, pluggable tools, and PostgreSQL-backed step persistence.",
    github: "https://github.com/vishusharma-rgm",
    live: null,
    accent: "#111111",
  },
];

export const workExperiences = [
  {
    title: "Backend Systems",
    company: "TaskForge",
    period: "2026",
    bullets: [
      "Distributed job processing with RabbitMQ worker queues and horizontal scaling",
      "Fault-tolerant retry/recovery improved async throughput by 3x",
      "Redis caching with multi-worker synchronization reduced p99 latency by 45%",
    ],
  },
  {
    title: "Realtime Collaboration",
    company: "ReviewSync",
    period: "2026",
    bullets: [
      "CRDT conflict resolution and WebSocket sync for zero merge conflicts under 10+ concurrent users",
      "Inline comments, RBAC, and suggestion workflows reduced review cycle time by 50%",
      "Sub-100ms latency with iterative performance improvements",
    ],
  },
  {
    title: "Agentic Backend",
    company: "Agentic Task Executor",
    period: "2026",
    bullets: [
      "Tool-using reasoning loop with code execution, file operations, and web search",
      "Async orchestration enables long-running multi-step tasks without blocking API threads",
      "PostgreSQL-backed task persistence tracks step execution, retries, and outcomes",
    ],
  },
];

export const bootLines = [
  "BIOS v4.2.1 — initializing kernel...",
  "loading modules: [backend] [distributed-systems] [realtime]",
  "mounting /dev/vishu ... OK",
  "checking dependencies: java, spring-boot, postgres, redis... OK",
  "warning: sleep_schedule not found — using defaults",
  "compiling portfolio... 100%",
  "boot sequence complete.",
  "welcome.",
];
