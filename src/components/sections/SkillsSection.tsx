/* ================================================================
   components/sections/SkillsSection.tsx
   Skills rendered as a JSON file with animated progress bars
   ================================================================ */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolioData';

interface SkillsSectionProps {
  isDark: boolean;
}

export default function SkillsSection({ isDark }: SkillsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(skills[0]?.label ?? null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Trigger progress bar animation when section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="min-h-[60vh] relative" ref={sectionRef}>
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {Array.from({ length: 55 }, (_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>

        {/* Content — styled as JSON */}
        <div className="flex-1 pt-4 pl-4 code-content overflow-y-auto pb-8">
          {/* File header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="syntax-comment">{'// Skills.json — Technical proficiency map'}</div>
          </motion.div>

          <div className="h-2" />

          <div>
            <span className="syntax-punctuation">{'{'}</span>
          </div>

          <div className="pl-4">
            <div>
              <span className="syntax-property">"meta"</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-punctuation">{'{'}</span>
              <span className="syntax-property"> "lastUpdated"</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">"2025"</span>
              <span className="syntax-operator">, </span>
              <span className="syntax-property">"format"</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">"proficiency-percentage"</span>
              <span className="syntax-punctuation">{' }'}</span>
              <span className="syntax-operator">,</span>
            </div>
          </div>

          <div className="h-3" />

          {/* Skill categories */}
          {skills.map((category, catIdx) => {
            const isExpanded = expandedCategory === category.label;

            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                className="pl-4 mb-2"
              >
                {/* Category header — clickable */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.label)}
                  className={`flex items-center gap-2 w-full text-left py-1 transition-colors rounded ${
                    isDark ? 'hover:bg-[#2a2d2e]' : 'hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span className={`text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                  <span className="syntax-property">"{category.label}"</span>
                  <span className="syntax-operator">: </span>
                  <span className="syntax-punctuation">{'{'}</span>
                  {!isExpanded && (
                    <>
                      <span className="syntax-comment text-[11px]"> {category.skills.length} skills </span>
                      <span className="syntax-punctuation">{'}'}</span>
                      <span className="syntax-operator">,</span>
                    </>
                  )}
                </button>

                {/* Expanded skill list with progress bars */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="pl-8 pb-2"
                  >
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIdx * 0.05, duration: 0.3 }}
                        className="mb-2.5"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="syntax-property text-[12px]">"{skill.name}"</span>
                            <span className="syntax-operator">: </span>
                          </div>
                          <span className="syntax-number text-[12px]">{skill.level}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="skill-bar">
                          <motion.div
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
                            transition={{
                              duration: 1.2,
                              delay: catIdx * 0.1 + skillIdx * 0.08,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                    <div>
                      <span className="syntax-punctuation">{'}'}</span>
                      <span className="syntax-operator">,</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          <div>
            <span className="syntax-punctuation">{'}'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
