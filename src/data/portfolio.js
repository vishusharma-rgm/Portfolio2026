export const profile = {
  name: "Vishu Sharma",
  role: "Full Stack Engineer",
  tagline: "Full Stack Engineer • Java Developer • Product Builder",
  blurb:
    "B.Tech Computer Science student building polished full-stack products and reliable distributed systems across the interface, API, data, and deployment layers.",
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
    image: "/assets/projects/taskforge.jpg",
    year: "2026",
    stack: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ", "Redis", "React.js"],
    description:
      "A distributed job processing system for reliable background work, with RabbitMQ queues, horizontal scaling, retry/recovery, Redis synchronization, and live observability.",
    focus: "reliable background work",
    outcome: "Queues, retries, recovery, and observability in one operational surface.",
    github: null,
    live: "https://task-forge-8zwz.onrender.com",
  },
  {
    id: "reviewsync",
    name: "ReviewSync",
    image: "/assets/projects/reviewsync.jpg",
    year: "2026",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets", "Yjs CRDT"],
    description:
      "A real-time collaborative code review platform with CRDT conflict resolution, WebSocket synchronization, inline comments, RBAC, suggestions, and version history.",
    focus: "conflict-free collaboration",
    outcome: "Multiple reviewers can work together without stepping on each other.",
    github: null,
    live: "https://review-sync-1.onrender.com",
  },
  {
    id: "resume-pilot",
    name: "ResumePilot",
    image: "/assets/projects/resume-pilot.jpg",
    year: "2026",
    stack: ["AI", "ATS Analysis", "Skill Matching"],
    description:
      "An AI-assisted resume workflow that helps candidates improve ATS readiness through skill matching, structured recommendations, and interview-focused feedback.",
    focus: "career tooling",
    outcome: "Turns a static resume into a practical improvement loop.",
    github: null,
    live: "https://resume-pilot-one.vercel.app",
  },
  {
    id: "smart-expense",
    name: "Smart Expense Tracker",
    image: "/assets/projects/smart-expense.jpg",
    year: "2026",
    stack: ["Personal Finance", "Budgets", "Analytics"],
    description:
      "A calm personal finance workspace for tracking expenses, income, budgets, and category trends without overwhelming dashboards.",
    focus: "calm data design",
    outcome: "Useful financial signals without dashboard overload.",
    github: null,
    live: "https://smart-expense-tracker-zeta-one.vercel.app",
  },
];

export const workExperiences = [
  {
    title: "Software Engineering Intern (Full Stack)",
    company: "Cognifyz Technologies",
    period: "Apr 2026 - May 2026 · Remote",
    bullets: [
      "Built scalable REST authentication services with Node.js/Express and multi-threaded request handling, improving API reliability by 35%.",
      "Owned features end-to-end by gathering requirements directly from stakeholders and shipping production-ready changes.",
      "Cut page load time by 25% through SSR migration and improved mobile engagement by 40% through responsive UI and performance debugging.",
    ],
  },
  {
    title: "Undergraduate Researcher",
    company: "BBDITM · Under Prof. Poonam Singh",
    period: "Feb 2026 - Present · Lucknow, India",
    bullets: [
      "Evaluated distributed system design patterns and concurrency trade-offs, doubling research program output and producing publication-ready documentation.",
      "Identified three implementation bottlenecks through algorithmic analysis and proposed fixes that kept the project on schedule.",
    ],
  },
];

export const bootLines = [
  "BIOS v4.2.1 — initializing kernel...",
  "loading modules: [full-stack] [distributed-systems] [realtime]",
  "mounting /dev/vishu ... OK",
  "checking dependencies: java, spring-boot, postgres, redis... OK",
  "warning: sleep_schedule not found — using defaults",
  "compiling portfolio... 100%",
  "boot sequence complete.",
  "welcome.",
];
