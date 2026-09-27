/* ================================================================
   components/sections/ProjectsSection.tsx
   Projects displayed as expandable "file tabs" with code detail views
   ================================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolioData';

interface ProjectsSectionProps {
  isDark: boolean;
}

export default function ProjectsSection({ isDark }: ProjectsSectionProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="min-h-[60vh] relative">
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 pt-4 pl-4 code-content overflow-y-auto pb-8">
          {/* File header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="syntax-comment">{'/**'}</div>
            <div className="syntax-comment">{' * @file    Projects.tsx'}</div>
            <div className="syntax-comment">{' * @desc    Shipped products — click to expand details'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-3" />

          {/* Projects array */}
          <div>
            <span className="syntax-keyword">export const</span>
            <span className="syntax-variable"> projects</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-punctuation">[</span>
          </div>

          <div className="h-2" />

          {projects.map((project, idx) => {
            const isExpanded = expandedProject === project.slug;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className="mb-4 ml-4"
              >
                {/* Project card as code block */}
                <button
                  onClick={() => setExpandedProject(isExpanded ? null : project.slug)}
                  className={`w-full text-left rounded-md transition-all duration-200 p-4 group ${
                    isDark
                      ? 'bg-[#252526] hover:bg-[#2a2d2e] border border-ide-border'
                      : 'bg-[#f8f8f8] hover:bg-[#f0f0f0] border border-light-border'
                  } ${isExpanded ? 'ring-1 ring-accent-green/40' : ''}`}
                >
                  {/* Project title line */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                      </span>
                      <span className="syntax-punctuation">{'{ '}</span>
                      <span className="syntax-property">title</span>
                      <span className="syntax-operator">: </span>
                      <span className="syntax-string font-medium">'{project.title}'</span>
                      <span className="syntax-punctuation">{' }'}</span>
                    </div>
                    <span className="syntax-comment text-[11px]">{'// click to expand'}</span>
                  </div>

                  {/* Tech chips always visible */}
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-6">
                    {project.tech.map((t, ti) => (
                      <span
                        key={ti}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                          isDark
                            ? 'bg-accent-green/10 text-accent-green border border-accent-green/20 group-hover:bg-accent-green/15'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`ml-4 pl-4 overflow-hidden ${
                        isDark ? 'border-l-2 border-accent-green/30' : 'border-l-2 border-emerald-300'
                      }`}
                    >
                      <div className="pt-3 pb-2 space-y-3">
                        {/* Problem */}
                        <div>
                          <span className="syntax-comment text-[11px]">{'// Problem'}</span>
                          <div className="mt-1">
                            <span className="syntax-property">problem</span>
                            <span className="syntax-operator">: </span>
                            <span className="syntax-string text-[12px]">'{project.problem}'</span>
                          </div>
                        </div>

                        {/* Solution */}
                        <div>
                          <span className="syntax-comment text-[11px]">{'// Solution'}</span>
                          <div className="mt-1">
                            <span className="syntax-property">solution</span>
                            <span className="syntax-operator">: </span>
                            <span className="syntax-string text-[12px]">'{project.solution}'</span>
                          </div>
                        </div>

                        {/* Key metrics */}
                        <div>
                          <span className="syntax-comment text-[11px]">{'// Impact'}</span>
                          <div className="mt-1">
                            <span className="syntax-property">metrics</span>
                            <span className="syntax-operator">: </span>
                            <span className="syntax-punctuation">[</span>
                            <div className="pl-4">
                              {project.metrics.map((m, mi) => (
                                <div key={mi}>
                                  <span className="text-accent-green text-[11px]">✓</span>
                                  <span className="syntax-string text-[12px]"> '{m}'</span>
                                  <span className="syntax-operator">,</span>
                                </div>
                              ))}
                            </div>
                            <span className="syntax-punctuation">]</span>
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 pt-1">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded transition-colors
                                bg-accent-blue/10 text-accent-blue border border-accent-blue/20
                                hover:bg-accent-blue/20"
                            >
                              ⎇ source()
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded transition-colors
                                bg-accent-green/10 text-accent-green border border-accent-green/20
                                hover:bg-accent-green/20"
                            >
                              ↗ demo()
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <div>
            <span className="syntax-punctuation">];</span>
          </div>
        </div>
      </div>
    </section>
  );
}
