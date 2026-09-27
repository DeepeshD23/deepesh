/* ================================================================
   data/portfolioData.ts
   Centralized data store for the entire portfolio.
   Edit content here without touching component logic.
   ================================================================ */

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship';
  bullets: string[];
  tech: string[];
}

export interface ProjectItem {
  title: string;
  slug: string;
  problem: string;
  solution: string;
  tech: string[];
  metrics: string[];
  link?: string;
  github?: string;
}

export interface SkillCategory {
  label: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  icon: string;
}

// ─── Personal Info ───────────────────────────────────────
export const personalInfo = {
  name: 'Deepesh Dagar',
  role: 'Software Development Engineer',
  tagline: 'SDE 1 — MERN Stack Specialist',
  location: 'Ahmedabad, Gujarat, India',
  email: 'dipeshdagar9@gmail.com',
  phone: '+91-6367867656',
  linkedin: 'https://www.linkedin.com/in/deepesh-dagar-45a389186/',
  github: 'https://github.com/DeepeshD23',
  resumeUrl: 'https://drive.google.com/file/d/1ce1thK49kCGZbRcNRFNso3wlUu4uFfAp/view?usp=sharing',
  summary: `Full-stack developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). 
Experienced in building scalable web applications, real-time systems, admin dashboards, RESTful APIs, 
database optimization, and Agile workflows. Passionate about clean architecture, performance-first 
engineering, and shipping production-ready software.`,
};

// ─── Experience ──────────────────────────────────────────
export const experience: ExperienceItem[] = [
  {
    role: 'Software Development Engineer (SDE 1)',
    company: 'Pravux Technologies Pvt. Ltd.',
    period: 'June 2025 — Present',
    type: 'full-time',
    bullets: [
      'Building scalable MERN-stack web applications serving production traffic',
      'Collaborating cross-functionally with design, QA, and product teams',
      'Driving performance optimizations — reduced API response times by 40%',
      'Implementing CI/CD best practices and code review workflows',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
  },
  {
    role: 'Software Development Intern',
    company: 'Bytegrit Innovations Pvt. Ltd.',
    period: 'Jan 2025 — Apr 2025',
    type: 'internship',
    bullets: [
      'Optimized backend modules and REST APIs, improving query speed by 35%',
      'Enhanced MongoDB query efficiency with indexing and aggregation pipelines',
      'Built real-time dashboards with WebSocket-powered data visualization',
      'Contributed to Agile sprints — daily stand-ups, sprint planning, retros',
    ],
    tech: ['Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Socket.io'],
  },
];

// ─── Projects ────────────────────────────────────────────
export const projects: ProjectItem[] = [
  {
    title: 'Real Estate Dashboard & Broker Management',
    slug: 'real-estate-dashboard',
    problem: 'Brokers managed commissions and leads via spreadsheets — no visibility, no automation, frequent errors.',
    solution: 'Built a role-based dashboard system with commission tracking, coupon management, cron-job automation (node-cron), email notifications, and MongoDB seed scripts for instant environment setup.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'node-cron', 'Nodemailer'],
    metrics: [
      'Role-based access for Admin, Broker, and Manager',
      'Automated commission reports via scheduled cron jobs',
      'Reduced manual data entry by 80%',
    ],
    github: 'https://github.com/DeepeshD23',
  },
  {
    title: 'Lead Management System',
    slug: 'lead-management',
    problem: 'Sales teams juggled multiple tools for lead tracking — no centralized pipeline or real-time collaboration.',
    solution: 'Multi-role lead distribution platform with real-time AJAX chat, server-side DataTables with CSV export, and granular role-based access control (RBAC).',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'AJAX', 'DataTables', 'RBAC'],
    metrics: [
      'Real-time chat between team members and leads',
      'CSV export for reporting and analytics',
      'Granular permissions across 4 user roles',
    ],
    link: 'https://github.com/DeepeshD23/Leads',
    github: 'https://github.com/DeepeshD23/Leads',
  },
  {
    title: 'Hotel Tourist Inn',
    slug: 'hotel-tourist-inn',
    problem: 'Hotel had no online booking system — guests called to check room availability, causing delays and double-bookings.',
    solution: 'Responsive booking platform with real-time room availability, secure authentication, full CRUD REST APIs, and an admin panel for inventory management.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    metrics: [
      'Real-time room availability checks',
      'Secure JWT-based authentication',
      'Full CRUD APIs for rooms, bookings, users',
    ],
    link: 'https://hoteltouristinn.vercel.app/',
    github: 'https://github.com/DeepeshD23',
  },
];

// ─── Skills ──────────────────────────────────────────────
export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'TypeScript', level: 78 },
      { name: 'Python', level: 72 },
      { name: 'SQL', level: 75 },
      { name: 'HTML5 / CSS3', level: 90 },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    icon: '⚛',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'Bootstrap', level: 80 },
      { name: 'jQuery', level: 75 },
    ],
  },
  {
    label: 'Databases',
    icon: '🗄',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 78 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Query Optimization', level: 80 },
    ],
  },
  {
    label: 'Tools & DevOps',
    icon: '⚙',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'PM2', level: 75 },
      { name: 'Linux', level: 72 },
      { name: 'Cron Jobs', level: 78 },
    ],
  },
  {
    label: 'Data & Analytics',
    icon: '📊',
    skills: [
      { name: 'Pandas', level: 68 },
      { name: 'NumPy', level: 65 },
      { name: 'Scikit-learn', level: 60 },
      { name: 'Matplotlib', level: 65 },
      { name: 'Tableau', level: 58 },
    ],
  },
];

// ─── Education ───────────────────────────────────────────
export const education: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'GLS University',
    location: 'Ahmedabad',
    period: '2023 — 2025',
    score: 'CGPA: 7.08',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Mohanlal Sukhadia University',
    location: 'Udaipur',
    period: '2021 — 2023',
    score: '79%',
  },
];

// ─── Achievements ────────────────────────────────────────
export const achievements: AchievementItem[] = [
  {
    title: 'Deloitte Australia — Data Analytics Job Simulation',
    description: 'Completed a professional-grade data analytics simulation focusing on real-world business scenarios, data visualization, and insight generation.',
    icon: '🏆',
  },
  {
    title: 'Active Open-Source Contributor',
    description: 'Regular contributions to GitHub repositories — bug fixes, feature PRs, and documentation improvements across the JS/Node ecosystem.',
    icon: '🔓',
  },
  {
    title: 'Coding Challenge Participant',
    description: 'Active participant in DSA and algorithm challenges — strengthening problem-solving and competitive programming skills.',
    icon: '⚡',
  },
];

// ─── IDE File Tree Structure ─────────────────────────────
export interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  sectionId?: string;
  children?: FileTreeNode[];
  language?: string;
}

export const fileTree: FileTreeNode[] = [
  {
    name: 'deepesh-dagar',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'Hero.tsx', type: 'file', icon: '⚛', sectionId: 'hero', language: 'tsx' },
          { name: 'About.tsx', type: 'file', icon: '⚛', sectionId: 'about', language: 'tsx' },
          { name: 'Experience.tsx', type: 'file', icon: '⚛', sectionId: 'experience', language: 'tsx' },
          { name: 'Projects.tsx', type: 'file', icon: '⚛', sectionId: 'projects', language: 'tsx' },
          { name: 'Skills.json', type: 'file', icon: '{ }', sectionId: 'skills', language: 'json' },
          { name: 'Education.tsx', type: 'file', icon: '⚛', sectionId: 'education', language: 'tsx' },
          { name: 'Achievements.md', type: 'file', icon: '📝', sectionId: 'achievements', language: 'md' },
        ],
      },
      { name: 'Contact.tsx', type: 'file', icon: '✉', sectionId: 'contact', language: 'tsx' },
      { name: 'README.md', type: 'file', icon: 'ℹ', sectionId: 'hero', language: 'md' },
      { name: 'package.json', type: 'file', icon: '{ }', language: 'json' },
    ],
  },
];
