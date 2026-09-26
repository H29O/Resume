export const personalInfo = {
  name: "HEET OSWAL",
  firstName: "Heet",
  lastName: "Oswal",
  role: "B.Tech Information Technology Student & Developer",
  institution: "Pimpri Chinchwad College of Engineering (PCCOE)",
  location: "Pune, Maharashtra, India",
  email: "heetoswal7@gmail.com",
  github: "https://github.com/H29O",
  linkedin: "https://www.linkedin.com/in/heet-oswal",
  leetcode: "https://leetcode.com/u/Heet29/",
  resumePath: "/Resume.pdf",
  bio: "B.Tech Information Technology student at PCCOE with a strong foundation in full-stack engineering, Java Spring Boot microservices, and modern web applications. Focused on architecting dependable software, task dependency modeling, and workflow automation.",
  stats: [
    { label: "CGPA (B.Tech IT)", value: "8.21", detail: "PCCOE" },
    { label: "CBSE Score", value: "96.2%", detail: "Reliance Foundation School" },
    { label: "HSC Score", value: "85%", detail: "Kamladevi Junior College" },
    { label: "Hackathons", value: "3+", detail: "SIH, IGC, Avishkar" }
  ]
};

export const educationData = [
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "Pimpri Chinchwad College of Engineering (PCCOE)",
    period: "2024 – Present",
    score: "CGPA: 8.21",
    scoreType: "CGPA",
    details: [
      "Core coursework in Data Structures, Object-Oriented Programming, Operating Systems, Database Management Systems, and Computer Networks.",
      "Active participant in technical symposiums, hackathons, and engineering teams."
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Kamladevi Junior College",
    period: "Completed",
    score: "85%",
    scoreType: "Percentage",
    details: [
      "Rigorous science and mathematics curriculum establishing analytical problem-solving foundation."
    ]
  },
  {
    degree: "Central Board of Secondary Education (CBSE)",
    institution: "Reliance Foundation School (English Medium)",
    period: "Completed",
    score: "96.2%",
    scoreType: "Percentage",
    details: [
      "Distinction across academic subjects with focus on mathematics, science, and computer applications."
    ]
  }
];

export const experienceData = [
  {
    id: "pccoe-magazine",
    role: "Editor",
    organization: "PCCOE Magazine Team",
    institution: "Pimpri Chinchwad College of Engineering",
    period: "Current / Senior Member",
    type: "Editorial Leadership",
    contributions: [
      "Contributed to editorial and writing work for the official college magazine.",
      "Currently guide junior team members as a senior member of the team.",
      "Manage article curation, editorial review cycles, and publication tone consistency."
    ]
  },
  {
    id: "itsa-marketing",
    role: "Marketing Team Member",
    organization: "ITSA – Marketing Team",
    institution: "Pimpri Chinchwad College of Engineering",
    period: "Academic Tenure",
    type: "Student Coordination & Outreach",
    contributions: [
      "Worked with senior team members in student coordination and event publicity.",
      "Coordinated campus outreach for departmental workshops, technical symposiums, and student engagement drives.",
      "Facilitated inter-departmental communication and technical event logistics."
    ]
  }
];

export const projectsData = [
  {
    id: "ripple",
    number: "01",
    title: "Ripple",
    subtitle: "Software Project Management & Schedule Impact Analysis",
    description: "A Software Project Management system that analyzes the impact of task delays on dependent tasks and project schedules. Implements task dependencies, delay propagation, affected-task identification, dynamic schedule updates, and risk analysis.",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
    architecture: "Backend microservice in Spring Boot with relational graph modeling for task cascades; interactive frontend in React.",
    highlights: [
      "Task dependency mapping and topological propagation of delays",
      "Affected-task identification engine with proactive risk flagging",
      "Automated schedule recalculation minimizing cascading slippage",
      "PostgreSQL normalized schema for tracking task state histories"
    ],
    githubUrl: "https://github.com/H29O",
    accentColor: "#FEE580", // Butter Yellow
    theme: "light"
  },
  {
    id: "nirvana",
    number: "02",
    title: "Nirvana",
    subtitle: "Full-Stack Personal Finance & Analytics Ledger",
    description: "A full-stack personal finance ledger for managing and analyzing financial transactions. Includes transaction and category management, lending/borrowing, receipt storage with OCR, and financial analytics.",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
    architecture: "Spring Boot RESTful service integrated with OCR pipeline and PostgreSQL; dynamic React analytics dashboards.",
    highlights: [
      "Double-entry bookkeeping concepts for income, expense, and category management",
      "Peer lending and borrowing ledger with settlement status tracking",
      "Automated receipt storage with OCR text extraction for hassle-free entry",
      "In-depth financial analytics, spending breakdowns, and trend projections"
    ],
    githubUrl: "https://github.com/H29O",
    accentColor: "#1842B8", // Cobalt Blue
    theme: "cobalt"
  },
  {
    id: "automated-email-sorter",
    number: "03",
    title: "Automated Email Sorter",
    subtitle: "No-Code Workflow Automation & Cloud Classification",
    description: "Developed a no-code workflow to categorize and label incoming emails using the Gmail API. Automated email organization through workflow logic and API integrations.",
    technologies: ["n8n", "APIs", "Google Cloud"],
    architecture: "Cloud-hosted n8n workflow listening to Gmail webhooks and executing conditional categorization nodes.",
    highlights: [
      "Gmail API integration with OAuth2 authentication and webhook subscriptions",
      "Configurable rule engine for semantic categorization and dynamic labeling",
      "Cloud execution on Google Cloud with zero server maintenance overhead",
      "Drastic reduction in inbox clutter through automated processing pipeline"
    ],
    githubUrl: "https://github.com/H29O",
    accentColor: "#E6C84F",
    theme: "charcoal"
  }
];

export const skillsData = {
  categories: [
    {
      name: "Languages",
      skills: [
        { name: "Java", level: "Primary", note: "Spring Boot microservices, OOP, Enterprise architecture" },
        { name: "Python", level: "Proficient", note: "Scripting, Automation, Data manipulation" },
        { name: "SQL", level: "Proficient", note: "Relational queries, Joins, Indexing, Schema design" },
        { name: "C++", level: "Core", note: "Algorithms, Data structures, System foundations" },
        { name: "C", level: "Foundational", note: "Memory management, low-level programming" }
      ]
    },
    {
      name: "Frameworks & Web",
      skills: [
        { name: "Spring Boot", level: "Primary", note: "REST APIs, JPA/Hibernate, Security, Dependency Injection" },
        { name: "ReactJS", level: "Primary", note: "Hooks, State management, Component architecture, SPAs" },
        { name: "REST APIs", level: "Standard", note: "HTTP semantics, JSON schemas, API design & contract" },
        { name: "Tailwind CSS", level: "Proficient", note: "Utility-first responsive layouts and rapid styling" }
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "PostgreSQL", level: "Primary", note: "ACID compliance, relational foreign keys, indexing" },
        { name: "MySQL", level: "Proficient", note: "Relational modeling, queries, procedures" },
        { name: "MongoDB", level: "Working", note: "Document store, NoSQL collections, flexible schemas" }
      ]
    },
    {
      name: "Tools & Cloud",
      skills: [
        { name: "Git", level: "Everyday", note: "Version control, branching workflows, PRs" },
        { name: "GitHub", level: "Everyday", note: "Repo management, GitHub Actions, collaboration" },
        { name: "Google Cloud", level: "Cloud", note: "GCP services, Cloud IAM, App hosting" },
        { name: "Postman", level: "Testing", note: "API endpoint testing, collections, mock requests" },
        { name: "Render", level: "Deployment", note: "Backend and web service deployment" },
        { name: "Vercel", level: "Deployment", note: "Continuous frontend deployment and edge previews" },
        { name: "Google Colab", level: "Prototyping", note: "Notebook workflows and quick experiments" }
      ]
    }
  ]
};

export const achievementsData = [
  {
    id: "igc-2025",
    title: "IGC Hackathon 2025",
    result: "Advanced to Round 2 of 3",
    tag: "Hackathon",
    year: "2025",
    description: "Competed through intensive multi-stage innovation challenges against top engineering student teams, advancing to round 2."
  },
  {
    id: "sih-2025",
    title: "Smart India Hackathon (SIH) 2025",
    result: "Participant",
    tag: "National Competition",
    year: "2025",
    description: "Participated in India's flagship nation-wide innovation hackathon tackling real-world problem statements."
  },
  {
    id: "avishkar-2026",
    title: "Avishkar 2026",
    result: "Participant",
    tag: "Research & Project Symposium",
    year: "2026",
    description: "Showcased technical project innovation and engineering research in prestigious university-level competition."
  }
];

export const navLinks = [
  { label: "ABOUT", href: "#about", id: "nav-about" },
  { label: "EXPERIENCE", href: "#experience", id: "nav-experience" },
  { label: "WORK", href: "#work", id: "nav-work" },
  { label: "SKILLS", href: "#skills", id: "nav-skills" },
  { label: "CONTACT", href: "#contact", id: "nav-contact" }
];
