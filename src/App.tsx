/* ================================================================
   App.tsx — Deepesh Dagar Portfolio
   Theme: BIKE RIDER — Dark asphalt, orange fire, raw speed
   Layout: Full single-page scroll with Framer Motion animations
   ================================================================ */
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

/* ──────────────────────────────────────────────
   DATA & CONSTANTS
   ────────────────────────────────────────────── */
const RESUME_URL = 'https://drive.google.com/file/d/1ce1thK49kCGZbRcNRFNso3wlUu4uFfAp/view?usp=sharing';
const HERO_BIKE_IMAGE = '/hero-bike.jpg';

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const STATS = [
  { value: '1+', label: 'Years Experience' },
  { value: '3+', label: 'Projects Shipped' },
  { value: 'MERN', label: 'Stack Mastered' },
  { value: '40%', label: 'API Speed Gain' },
];

const EXPERIENCE = [
  {
    role: 'Software Development Engineer (SDE 1)',
    company: 'Pravux Technologies Pvt. Ltd.',
    period: 'June 2025 — Present',
    type: 'Full-Time',
    color: '#ff6b00',
    bullets: [
      'Building scalable MERN-stack web applications serving production traffic',
      'Cross-functional collaboration with design, QA, and product teams',
      'Drove performance optimizations — reduced API response times by 40%',
      'Implementing CI/CD best practices and structured code review workflows',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
  },
  {
    role: 'Software Development Intern',
    company: 'Bytegrit Innovations Pvt. Ltd.',
    period: 'Jan 2025 — Apr 2025',
    type: 'Internship',
    color: '#888',
    bullets: [
      'Optimized backend modules and REST APIs — improved query speed by 35%',
      'Enhanced MongoDB query efficiency via indexing and aggregation pipelines',
      'Built real-time dashboards with WebSocket-powered data visualization',
      'Contributed to Agile sprints — stand-ups, planning, retrospectives',
    ],
    tech: ['Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'REST APIs'],
  },
];

const PROJECTS = [
  {
    id: 'real-estate',
    number: '01',
    title: 'Real Estate Dashboard',
    subtitle: 'Broker Management System',
    description: 'Role-based dashboard system with commission tracking, coupon management, cron-job automation, email notifications, and MongoDB seed scripts. Eliminated spreadsheet chaos for 80% of manual data entry.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'node-cron', 'Nodemailer'],
    metrics: ['Role-based access (Admin / Broker / Manager)', 'Automated commission reports via cron jobs', '80% reduction in manual data entry'],
    github: 'https://github.com/DeepeshD23',
    live: null,
  },
  {
    id: 'lead-mgmt',
    number: '02',
    title: 'Lead Management System',
    subtitle: 'Multi-Role Pipeline & RBAC',
    description: 'Centralized lead distribution platform with real-time AJAX chat, server-side DataTables with CSV export, and granular role-based access control across 4 user roles.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'AJAX', 'DataTables', 'RBAC'],
    metrics: ['Real-time team–lead chat', 'CSV export for reporting', 'Granular permissions across 4 roles'],
    github: 'https://github.com/DeepeshD23/Leads',
    live: 'https://github.com/DeepeshD23/Leads',
  },
  {
    id: 'hotel',
    number: '03',
    title: 'Hotel Tourist Inn',
    subtitle: 'Booking & Availability Platform',
    description: 'Responsive hotel booking platform with real-time room availability checks, JWT-secured authentication, full CRUD REST APIs, and an admin panel for inventory management.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    metrics: ['Real-time availability checks', 'JWT-based secure auth', 'Full CRUD for rooms, bookings, users'],
    github: 'https://github.com/DeepeshD23',
    live: 'https://hoteltouristinn.vercel.app/',
  },
];

const SKILLS_GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'TypeScript', level: 78 },
      { name: 'Python', level: 72 },
      { name: 'SQL', level: 75 },
      { name: 'HTML5 / CSS3', level: 90 },
    ],
  },
  {
    label: 'Frameworks',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'React.js', level: 85 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'jQuery / AJAX', level: 75 },
    ],
  },
  {
    label: 'Databases',
    items: [
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 78 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Query Optimization', level: 80 },
    ],
  },
  {
    label: 'Tools & DevOps',
    items: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'PM2 / Linux', level: 72 },
      { name: 'Cron Jobs', level: 78 },
    ],
  },
];

const TECH_MARQUEE = [
  'React.js', '///', 'Node.js', '///', 'MongoDB', '///', 'Express.js', '///',
  'TypeScript', '///', 'REST APIs', '///', 'Socket.io', '///', 'JWT', '///',
  'Postman', '///', 'Git', '///', 'PM2', '///', 'Linux', '///', 'Tailwind', '///',
  'React.js', '///', 'Node.js', '///', 'MongoDB', '///', 'Express.js', '///',
  'TypeScript', '///', 'REST APIs', '///', 'Socket.io', '///', 'JWT', '///',
];

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ──────────────────────────────────────────────
   REUSABLE: SECTION REVEAL WRAPPER
   ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   COMPONENT: CUSTOM CURSOR
   ────────────────────────────────────────────── */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = e.clientX - 4 + 'px';
        dot.current.style.top = e.clientY - 4 + 'px';
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 18 + 'px';
        ring.current.style.top = e.clientY - 18 + 'px';
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!(t.tagName === 'BUTTON' || t.tagName === 'A' || t.closest('button') || t.closest('a')));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}

/* ──────────────────────────────────────────────
   COMPONENT: SCROLL PROGRESS BAR
   ────────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return <motion.div className="scroll-progress" style={{ width }} />;
}

/* ──────────────────────────────────────────────
   COMPONENT: NAVBAR
   ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' }}>
                <span className="font-display text-black font-black text-sm">DD</span>
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-brand-orange transition-colors">
                DEEPESH
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
                >
                  {link}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !px-5 !text-sm"
              >
                <span>↓</span> Resume
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                className="nav-link text-white"
                style={{ fontSize: '40px', fontStyle: 'italic' }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link}
              </motion.button>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4"
            >
              ↓ Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────────────────────────────────────────
   SECTION: HERO
   ────────────────────────────────────────────── */
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [typed, setTyped] = useState('');
  const roles = ['MERN Stack Specialist', 'Full-Stack Developer', 'API Architect', 'React + Node.js Dev'];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setTyped(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIdx > 0) {
          setTyped(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setRoleIdx(i => (i + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 70);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Background elements */}
      <div className="absolute inset-0 bg-brand-darker" />
      <div className="absolute inset-0 bg-hero-grad pointer-events-none" />
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,107,0,0.015) 80px, rgba(255,107,0,0.015) 81px)' }} />

      {/* Large background text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
      >
        <span
          className="font-display font-black italic text-right block leading-none"
          style={{ fontSize: 'clamp(120px, 18vw, 260px)', color: 'rgba(255,107,0,0.04)', letterSpacing: '-0.02em' }}
        >
          SDE
        </span>
      </motion.div>

      {/* Speed lines decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 pointer-events-none hidden xl:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 h-px"
            style={{
              top: `${-60 + i * 24}px`,
              width: `${120 + i * 40}px`,
              background: `linear-gradient(90deg, transparent, rgba(255,107,0,${0.05 + i * 0.03}))`,
            }}
          />
        ))}
      </div>

      <div className="section-container w-full relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Tag */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            className="flex items-center gap-3 mb-6"
            >
            <div className="w-8 h-px bg-brand-orange" />
            <span className="section-tag">Software Development Engineer · SDE 1</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
            className="section-heading mb-4"
            style={{ fontSize: 'clamp(52px, 10vw, 128px)' }}
            >
              Deepesh
              <br />
            <span className="text-brand-orange">Dagar</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
            className="flex items-center gap-3 mb-8"
            >
            <span className="font-body text-xl md:text-2xl text-brand-muted font-light">
                {typed}
              <span className="inline-block w-0.5 h-6 bg-brand-orange ml-0.5 animate-pulse align-middle" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
            className="font-body text-base md:text-lg text-brand-muted leading-relaxed max-w-xl mb-10"
            >
            Full-stack developer specializing in the MERN stack. I build{' '}
            <span className="text-white">scalable web applications</span>,{' '}
            real-time systems, and RESTful APIs — from zero to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
            className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
              <span>→</span> View Work
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <span>↓</span> Download Resume
              </a>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-border rounded-sm overflow-hidden"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                className="bg-brand-surface px-6 py-5 flex flex-col gap-1"
                >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="section-tag text-xs">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-orange to-transparent" />
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: TECH MARQUEE STRIP
   ────────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <div className="bg-brand-orange py-3 overflow-hidden">
      <div className="marquee-inner">
        {TECH_MARQUEE.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-black text-sm tracking-widest uppercase px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION: ABOUT
   ────────────────────────────────────────────── */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 bg-brand-dark relative overflow-hidden">
      <div className="section-number">01</div>
      <div className="section-container" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.span
              variants={fadeLeft}
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-tag block mb-4"
            >
              — Who I Am
            </motion.span>
            <motion.h2
              variants={fadeLeft}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-heading mb-8"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              Built for
              <br />
              <span className="text-brand-orange">Speed &</span>
              <br />
              Scale
            </motion.h2>

            <motion.p
              variants={fadeLeft}
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-body text-brand-muted leading-relaxed mb-6 text-base"
            >
              Full-stack developer specializing in the <span className="text-white font-medium">MERN stack</span> (MongoDB, Express.js, React.js, Node.js). 
              Experienced in building scalable web applications, real-time systems, 
              admin dashboards, and RESTful APIs.
            </motion.p>
            <motion.p
              variants={fadeLeft}
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-body text-brand-muted leading-relaxed mb-10 text-base"
            >
              I work in Agile environments, obsess over performance, and believe clean 
              architecture is the difference between code that lasts and code that breaks.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3"
            >
              {['Ahmedabad, India', 'Available for Opportunities', 'Open to Relocation'].map((tag, i) => (
                <motion.span key={i} variants={fadeLeft} custom={i} className="tag-chip">
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right — decorative code card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="card-dark p-6 font-mono text-sm relative">
              {/* Traffic light buttons */}
              <div className="flex gap-1.5 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-brand-dimmed font-mono">deepesh.config.ts</span>
              </div>
              <div className="space-y-1 text-xs md:text-sm leading-relaxed">
                <div><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">developer</span> <span className="text-white">=</span> <span className="text-[#4ec9b0]">{'{'}</span></div>
                <div className="pl-5"><span className="text-[#9cdcfe]">name</span><span className="text-white">:</span> <span className="text-brand-orange">"Deepesh Dagar"</span><span className="text-white">,</span></div>
                <div className="pl-5"><span className="text-[#9cdcfe]">role</span><span className="text-white">:</span> <span className="text-brand-orange">"SDE 1 — MERN"</span><span className="text-white">,</span></div>
                <div className="pl-5"><span className="text-[#9cdcfe]">location</span><span className="text-white">:</span> <span className="text-brand-orange">"Ahmedabad, India"</span><span className="text-white">,</span></div>
                <div className="pl-5"><span className="text-[#9cdcfe]">stack</span><span className="text-white">: [</span></div>
                <div className="pl-10"><span className="text-brand-orange">"MongoDB"</span><span className="text-white">,</span> <span className="text-brand-orange">"Express"</span><span className="text-white">,</span></div>
                <div className="pl-10"><span className="text-brand-orange">"React"</span><span className="text-white">,</span> <span className="text-brand-orange">"Node.js"</span></div>
                <div className="pl-5"><span className="text-white">],</span></div>
                <div className="pl-5"><span className="text-[#9cdcfe]">available</span><span className="text-white">:</span> <span className="text-[#569cd6]">true</span><span className="text-white">,</span></div>
                <div><span className="text-[#4ec9b0]">{'}'}</span><span className="text-white">;</span></div>
              </div>
              {/* Glow corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-orange/5 blur-2xl rounded-full" />
            </div>

            {/* Contact quick-links */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Email', value: 'dipeshdagar9@gmail.com', href: 'mailto:dipeshdagar9@gmail.com' },
                { label: 'Phone', value: '+91-6367867656', href: 'tel:+916367867656' },
                { label: 'LinkedIn', value: 'deepesh-dagar', href: 'https://www.linkedin.com/in/deepesh-dagar-45a389186/' },
                { label: 'GitHub', value: 'DeepeshD23', href: 'https://github.com/DeepeshD23' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="card-dark p-3 block group"
                >
                  <span className="section-tag text-[10px] block mb-1">{item.label}</span>
                  <span className="font-mono text-xs text-brand-muted group-hover:text-brand-orange transition-colors truncate block">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: EXPERIENCE
   ────────────────────────────────────────────── */
function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-28 bg-brand-surface relative overflow-hidden">
      <div className="section-number">02</div>
      <div className="section-container" ref={ref}>
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span variants={fadeLeft} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-tag block mb-4">— Where I've Ridden</motion.span>
            <motion.h2 variants={fadeLeft} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Experience
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="speed-line w-32 sm:w-48" />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              custom={idx}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="card-dark p-6 md:p-8 relative overflow-hidden group">
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
                  style={{ background: exp.color }}
                />

                <div className="pl-4 md:pl-6">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded-sm font-medium"
                          style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}30` }}
                        >
                          {exp.type}
                        </span>
                        <span className="font-mono text-xs text-brand-muted">{exp.period}</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-white group-hover:text-brand-orange transition-colors italic">
                        {exp.role}
                      </h3>
                      <p className="font-body text-brand-muted text-sm mt-0.5">{exp.company}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3 font-body text-sm text-brand-muted">
                        <span className="text-brand-orange mt-1 flex-shrink-0">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Background number */}
                <div className="absolute right-6 bottom-4 font-display text-8xl font-black italic text-white/[0.02] select-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: PROJECTS
   ────────────────────────────────────────────── */
function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28 bg-brand-dark relative overflow-hidden">
      <div className="section-number">03</div>
      <div className="section-container" ref={ref}>
        {/* Heading */}
        <div className="mb-16">
          <motion.span variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-tag block mb-4">— What I've Built</motion.span>
          <motion.h2 variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            Shipped Projects
          </motion.h2>
        </div>

        {/* Project list */}
        <div className="space-y-6">
          {PROJECTS.map((project, idx) => {
            const isOpen = activeProject === project.id;
            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                custom={idx}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div
                  className={`card-dark group cursor-pointer relative overflow-hidden ${isOpen ? 'border-brand-orange/40' : ''}`}
                  onClick={() => setActiveProject(isOpen ? null : project.id)}
                >
                  <div className="project-overlay" />
                  <div className="p-6 md:p-8">
                    {/* Row: number, title, arrow */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-5">
                        <span className="font-display font-black italic text-5xl md:text-6xl text-brand-orange/20 leading-none mt-1">
                          {project.number}
                        </span>
                        <div>
                          <p className="font-mono text-xs text-brand-muted mb-1">{project.subtitle}</p>
                          <h3 className="font-display font-bold italic text-2xl md:text-3xl text-white group-hover:text-brand-orange transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tech.slice(0, 4).map((t) => (
                              <span key={t} className="tag-chip">{t}</span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="tag-chip">+{project.tech.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 border border-brand-border rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-brand-orange/40 group-hover:text-brand-orange transition-colors mt-1"
                      >
                        <span className="text-lg text-brand-muted group-hover:text-brand-orange">+</span>
                      </motion.div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-6 border-t border-brand-border">
                            <div className="grid md:grid-cols-2 gap-8">
                              {/* Description */}
                              <div>
                                <span className="section-tag text-[10px] block mb-3">Project Overview</span>
                                <p className="font-body text-sm text-brand-muted leading-relaxed">
                                  {project.description}
                                </p>
                                {/* All tech */}
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                  {project.tech.map((t) => (
                                    <span key={t} className="tag-chip">{t}</span>
                                  ))}
                                </div>
                              </div>

                              {/* Metrics + Links */}
                              <div>
                                <span className="section-tag text-[10px] block mb-3">Key Impact</span>
                                <ul className="space-y-2 mb-6">
                                  {project.metrics.map((m, mi) => (
                                    <li key={mi} className="flex items-start gap-3 font-body text-sm text-brand-muted">
                                      <span className="text-brand-orange flex-shrink-0 mt-0.5">✓</span>
                                      <span>{m}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="flex gap-3">
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="btn-outline !py-2 !px-4 !text-sm"
                                    >
                                      GitHub ↗
                                    </a>
                                  )}
                                  {project.live && (
                                    <a
                                      href={project.live}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="btn-primary !py-2 !px-4 !text-sm"
                                    >
                                      Live ↗
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: SKILLS
   ────────────────────────────────────────────── */
function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section id="skills" className="py-28 bg-brand-surface relative overflow-hidden">
      <div className="section-number">04</div>
      <div className="section-container" ref={ref}>
        {/* Heading */}
        <div className="mb-16">
          <motion.span variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-tag block mb-4">— Under the Hood</motion.span>
          <motion.h2 variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            Tech Stack
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-brand-border">
          {/* Category tabs */}
          <div className="md:col-span-1">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex md:flex-col gap-px bg-brand-border overflow-x-auto md:overflow-x-visible"
            >
              {SKILLS_GROUPS.map((group, i) => (
                <motion.button
                  key={group.label}
                  variants={fadeLeft}
                  custom={i}
                  onClick={() => setActiveGroup(i)}
                  className={`flex-shrink-0 md:flex-shrink text-left px-6 py-4 font-display font-bold italic text-lg md:text-xl uppercase tracking-wide transition-all duration-200 ${
                    activeGroup === i
                      ? 'bg-brand-dark text-brand-orange'
                      : 'bg-brand-surface text-brand-muted hover:text-white hover:bg-brand-dark'
                  }`}
                >
                  {group.label}
                  {activeGroup === i && (
                    <div className="hidden md:block w-6 h-0.5 bg-brand-orange mt-1" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Skill bars */}
          <div className="md:col-span-2 bg-brand-dark p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {SKILLS_GROUPS[activeGroup].items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-sm text-white font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-brand-orange">{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${skill.level}%` : 0 }}
                        transition={{ duration: 1.4, delay: si * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Education card inside skills */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mt-10 pt-8 border-t border-brand-border"
            >
              <span className="section-tag block mb-4">Education</span>
              <div className="space-y-4">
                {[
                  { degree: 'MCA — Master of Computer Applications', school: 'GLS University, Ahmedabad', period: '2023–2025', score: 'CGPA 7.08' },
                  { degree: 'BCA — Bachelor of Computer Applications', school: 'Mohanlal Sukhadia University', period: '2021–2023', score: '79%' },
                ].map((edu, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-brand-border last:border-0">
                    <div>
                      <p className="font-display font-bold italic text-base text-white">{edu.degree}</p>
                      <p className="font-body text-xs text-brand-muted mt-0.5">{edu.school}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xs text-brand-orange">{edu.score}</p>
                      <p className="font-mono text-xs text-brand-dimmed">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Achievements strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-3 gap-4 mt-6"
        >
          {[
            { icon: '🏆', title: 'Deloitte Australia', sub: 'Data Analytics Job Simulation' },
            { icon: '⚡', title: 'Open-Source Contributor', sub: 'Active GitHub contributions' },
            { icon: '🎯', title: 'DSA Challenger', sub: 'Regular algorithm competitions' },
          ].map((ach, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="card-dark p-5 flex items-start gap-4"
            >
              <span className="text-2xl flex-shrink-0">{ach.icon}</span>
              <div>
                <p className="font-display font-bold italic text-base text-white">{ach.title}</p>
                <p className="font-body text-xs text-brand-muted mt-1">{ach.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: CONTACT
   ────────────────────────────────────────────── */
function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:dipeshdagar9@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-28 bg-brand-dark relative overflow-hidden">
      <div className="section-number">05</div>
      {/* Background glow */}
      <div className="absolute inset-0 bg-orange-glow pointer-events-none" />

      <div className="section-container" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.span variants={fadeLeft} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-tag block mb-4">— Let's Build Together</motion.span>
            <motion.h2
              variants={fadeLeft}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-heading mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              Open<br />
              <span className="text-brand-orange">Throttle</span>
            </motion.h2>
            <motion.p
              variants={fadeLeft}
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-body text-brand-muted leading-relaxed mb-10 text-base max-w-sm"
            >
              Have a project in mind, or just want to talk shop? 
              I'm always up for a conversation about tech, interesting builds, and big ideas.
            </motion.p>

            {/* Contact links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              {[
                { icon: '✉', label: 'Email', value: 'dipeshdagar9@gmail.com', href: 'mailto:dipeshdagar9@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+91-6367867656', href: 'tel:+916367867656' },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/deepesh-dagar', href: 'https://www.linkedin.com/in/deepesh-dagar-45a389186/' },
                { icon: '⎇', label: 'GitHub', value: 'github.com/DeepeshD23', href: 'https://github.com/DeepeshD23' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={fadeLeft}
                  custom={i}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 bg-brand-surface border border-brand-border flex items-center justify-center flex-shrink-0 group-hover:border-brand-orange/50 group-hover:bg-brand-orange/5 transition-all duration-200">
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-brand-dimmed uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-body text-sm text-brand-muted group-hover:text-brand-orange transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — contact form */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label className="section-tag text-[10px] block mb-2" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id as 'name' | 'email']}
                    onChange={(e) => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    className="w-full bg-brand-surface border border-brand-border rounded-none px-4 py-3 font-body text-sm text-white placeholder-brand-dimmed focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="section-tag text-[10px] block mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-brand-surface border border-brand-border rounded-none px-4 py-3 font-body text-sm text-white placeholder-brand-dimmed focus:outline-none focus:border-brand-orange transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {sent ? '✓ Opening Mail Client...' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   COMPONENT: FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-brand-darker py-8 border-t border-brand-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-orange flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' }}>
              <span className="font-display text-black font-black text-xs">DD</span>
            </div>
            <span className="font-display font-bold text-sm tracking-wider text-white">DEEPESH DAGAR</span>
          </div>
          <p className="font-mono text-xs text-brand-dimmed">
            Designed & Built by Deepesh Dagar · {new Date().getFullYear()}
          </p>
          <div className="flex gap-5">
            {[
              { label: 'GitHub', href: 'https://github.com/DeepeshD23' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepesh-dagar-45a389186/' },
              { label: 'Email', href: 'mailto:dipeshdagar9@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="font-mono text-xs text-brand-dimmed hover:text-brand-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   ROOT APP
   ────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
