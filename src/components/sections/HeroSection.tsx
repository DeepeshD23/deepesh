/* ================================================================
   components/sections/HeroSection.tsx
   Landing section styled as a code file with typing animation
   ================================================================ */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';

interface HeroSectionProps {
  isDark: boolean;
}

/* Animated typing hook */
function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;

    const startTyping = () => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsDone(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayed, isDone };
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  const role = useTypingEffect('Software Developer', 60, 500);
  const specialization = useTypingEffect(' | MERN Stack Specialist', 50, 2200);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* Line numbers for the "code" display */
  const lines = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <section id="hero" className="min-h-[calc(100vh-90px)] relative">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />

      <div className="flex h-full">
        {/* Line number gutter */}
        <div className={`hidden sm:flex flex-col pt-4 pr-0 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {lines.map((n) => (
            <div key={n} className="line-number">{n}</div>
          ))}
        </div>

        {/* Code content area */}
        <div className="flex-1 pt-4 pl-4 code-content overflow-y-auto">
          {/* Comment header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="syntax-comment">{'/**'}</div>
            <div className="syntax-comment">{' * @file    README.md'}</div>
            <div className="syntax-comment">{' * @author  Deepesh Dagar'}</div>
            <div className="syntax-comment">{' * @desc    Portfolio — Welcome'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-2" />

          {/* Import statement */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <span className="syntax-keyword">import</span>
            <span className="syntax-operator">{' { '}</span>
            <span className="syntax-type">Developer</span>
            <span className="syntax-operator">{' } '}</span>
            <span className="syntax-keyword">from</span>
            <span className="syntax-string"> '@deepesh-dagar/portfolio'</span>
            <span className="syntax-operator">;</span>
          </motion.div>

          <div className="h-2" />

          {/* Main constant */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span className="syntax-keyword">const</span>
            <span className="syntax-variable"> deepesh</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-keyword">new</span>
            <span className="syntax-type"> Developer</span>
            <span className="syntax-punctuation">{'({'}</span>
          </motion.div>

          {/* Object properties */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="pl-8"
          >
            <div>
              <span className="syntax-property">name</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">'{personalInfo.name}'</span>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">role</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">'
                <span className="text-accent-green">
                  {role.displayed}
                  {!role.isDone && <span className="animate-cursor-blink">|</span>}
                  {role.isDone && (
                    <>
                      {specialization.displayed}
                      {!specialization.isDone && <span className="animate-cursor-blink">|</span>}
                    </>
                  )}
                </span>
              '</span>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">location</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">'{personalInfo.location}'</span>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">stack</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-punctuation">[</span>
              <span className="syntax-string">'MongoDB'</span>
              <span className="syntax-operator">, </span>
              <span className="syntax-string">'Express'</span>
              <span className="syntax-operator">, </span>
              <span className="syntax-string">'React'</span>
              <span className="syntax-operator">, </span>
              <span className="syntax-string">'Node.js'</span>
              <span className="syntax-punctuation">]</span>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">available</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-keyword">true</span>
              <span className="syntax-operator">,</span>
            </div>
          </motion.div>

          {/* Closing brace */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="syntax-punctuation">{'});'}</span>
          </motion.div>

          <div className="h-4" />

          {/* CTA section as function calls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="syntax-comment">{'// → Quick actions'}</span>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-medium transition-all duration-200
                  bg-accent-green/10 text-accent-green border border-accent-green/30
                  hover:bg-accent-green/20 hover:border-accent-green/60 hover:shadow-[0_0_15px_rgba(78,201,176,0.15)]"
              >
                <span>{'>'}</span>
                <span>viewWork()</span>
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-medium transition-all duration-200
                  bg-accent-blue/10 text-accent-blue border border-accent-blue/30
                  hover:bg-accent-blue/20 hover:border-accent-blue/60 hover:shadow-[0_0_15px_rgba(86,156,214,0.15)]"
              >
                <span>↓</span>
                <span>downloadResume()</span>
              </a>
            </div>
          </motion.div>

          <div className="h-4" />

          {/* Terminal-style status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 font-mono text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent-green">❯</span>
              <span className="text-accent-yellow">deepesh.status()</span>
            </div>
            <div className="pl-5 mt-1">
              <span className="text-accent-green flex items-center gap-2">
                <span className="status-dot online" />
                Currently building at {personalInfo.name.split(' ')[0]}'s workspace
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
