/* ================================================================
   components/sections/ExperienceSection.tsx
   Experience rendered as a git log / timeline in code style
   ================================================================ */
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';

interface ExperienceSectionProps {
  isDark: boolean;
}

export default function ExperienceSection({ isDark }: ExperienceSectionProps) {
  const lineStart = 1;

  return (
    <section id="experience" className="min-h-[60vh] relative">
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="line-number">{lineStart + i}</div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 pt-4 pl-4 code-content overflow-y-auto pb-8">
          {/* File header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="syntax-comment">{'/**'}</div>
            <div className="syntax-comment">{' * @file    Experience.tsx'}</div>
            <div className="syntax-comment">{' * @desc    Professional journey — rendered as a timeline'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-3" />

          {/* Import */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="syntax-keyword">import</span>
            <span className="syntax-operator">{' { '}</span>
            <span className="syntax-type">Timeline</span>
            <span className="syntax-operator">, </span>
            <span className="syntax-type">Role</span>
            <span className="syntax-operator">{' } '}</span>
            <span className="syntax-keyword">from</span>
            <span className="syntax-string"> '@career/experience'</span>
            <span className="syntax-operator">;</span>
          </motion.div>

          <div className="h-4" />

          {/* Timeline entries */}
          <div>
            <span className="syntax-keyword">const</span>
            <span className="syntax-variable"> journey</span>
            <span className="syntax-operator">: </span>
            <span className="syntax-type">Timeline</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-punctuation">[</span>
          </div>

          <div className="h-2" />

          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
              className={`ml-4 mb-6 pl-6 relative ${
                isDark ? 'border-l-2 border-ide-border' : 'border-l-2 border-light-border'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                idx === 0
                  ? 'bg-accent-green border-accent-green shadow-[0_0_8px_rgba(78,201,176,0.5)]'
                  : isDark
                    ? 'bg-ide-bg border-ide-border'
                    : 'bg-white border-light-border'
              }`} />

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  exp.type === 'full-time'
                    ? 'bg-accent-green/15 text-accent-green border border-accent-green/30'
                    : 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30'
                }`}>
                  {exp.type === 'full-time' ? '● ACTIVE' : '○ COMPLETED'}
                </span>
                <span className="syntax-comment text-[11px]">{'// '}{exp.period}</span>
              </div>

              {/* Role object */}
              <div>
                <span className="syntax-punctuation">{'{'}</span>
              </div>
              <div className="pl-4">
                <div>
                  <span className="syntax-property">role</span>
                  <span className="syntax-operator">: </span>
                  <span className="syntax-string text-sm">'{exp.role}'</span>
                  <span className="syntax-operator">,</span>
                </div>
                <div>
                  <span className="syntax-property">company</span>
                  <span className="syntax-operator">: </span>
                  <span className="syntax-string text-sm">'{exp.company}'</span>
                  <span className="syntax-operator">,</span>
                </div>

                {/* Bullet points as array */}
                <div className="mt-1">
                  <span className="syntax-property">contributions</span>
                  <span className="syntax-operator">: </span>
                  <span className="syntax-punctuation">[</span>
                </div>
                <div className="pl-4">
                  {exp.bullets.map((bullet, bi) => (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.15 + bi * 0.06, duration: 0.3 }}
                    >
                      <span className="syntax-string text-[12px]">'{bullet}'</span>
                      <span className="syntax-operator">,</span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <span className="syntax-punctuation">]</span>
                  <span className="syntax-operator">,</span>
                </div>

                {/* Tech tags */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exp.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDark
                          ? 'bg-accent-blue/10 text-accent-lightBlue border border-accent-blue/20'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1">
                <span className="syntax-punctuation">{'}'}</span>
                <span className="syntax-operator">,</span>
              </div>
            </motion.div>
          ))}

          <div>
            <span className="syntax-punctuation">];</span>
          </div>
        </div>
      </div>
    </section>
  );
}
