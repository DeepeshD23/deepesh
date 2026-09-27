/* ================================================================
   components/sections/AchievementsSection.tsx
   Achievements rendered as a markdown-style document
   ================================================================ */
import { motion } from 'framer-motion';
import { achievements } from '../../data/portfolioData';

interface AchievementsSectionProps {
  isDark: boolean;
}

export default function AchievementsSection({ isDark }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="min-h-[40vh] relative">
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} className="line-number">{i + 1}</div>
          ))}
        </div>

        {/* Content — styled as Markdown preview */}
        <div className="flex-1 pt-4 pl-4 pr-8 overflow-y-auto pb-8">
          {/* File header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-accent-comment mb-4">
              {'<!-- Achievements.md — Rendered preview mode -->'} 
            </div>
          </motion.div>

          {/* Markdown heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xl font-bold text-accent-green mb-1"
          >
            # Achievements & Certifications
          </motion.h2>
          
          <div className={`h-px mb-6 ${isDark ? 'bg-ide-border' : 'bg-light-border'}`} />

          {/* Achievement cards */}
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className={`p-4 rounded-md transition-all duration-200 group ${
                  isDark
                    ? 'bg-[#252526] border border-ide-border hover:border-accent-green/40'
                    : 'bg-[#f8f8f8] border border-light-border hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </span>

                  <div>
                    {/* Title as markdown heading */}
                    <div className="font-mono text-sm font-semibold text-accent-blue mb-1">
                      ## {achievement.title}
                    </div>

                    {/* Description as paragraph */}
                    <p className={`text-[13px] font-sans leading-relaxed ${
                      isDark ? 'text-[#b0b0b0]' : 'text-[#555]'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="h-4" />

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-mono text-xs text-accent-comment"
          >
            {'---'}
            <br />
            {'> Always learning, always shipping. 🚀'}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
