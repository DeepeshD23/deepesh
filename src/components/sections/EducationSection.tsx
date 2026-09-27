/* ================================================================
   components/sections/EducationSection.tsx
   Education as a code module with const declarations
   ================================================================ */
import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';

interface EducationSectionProps {
  isDark: boolean;
}

export default function EducationSection({ isDark }: EducationSectionProps) {
  return (
    <section id="education" className="min-h-[40vh] relative">
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {Array.from({ length: 30 }, (_, i) => (
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
            <div className="syntax-comment">{' * @file    Education.tsx'}</div>
            <div className="syntax-comment">{' * @desc    Academic background'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-3" />

          {/* Type definition */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="syntax-keyword">type</span>
            <span className="syntax-type"> Degree</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-punctuation">{'{'}</span>
            <span className="syntax-property"> institution</span>
            <span className="syntax-operator">: </span>
            <span className="syntax-type">string</span>
            <span className="syntax-operator">; </span>
            <span className="syntax-property">period</span>
            <span className="syntax-operator">: </span>
            <span className="syntax-type">string</span>
            <span className="syntax-operator">; </span>
            <span className="syntax-property">score</span>
            <span className="syntax-operator">: </span>
            <span className="syntax-type">string</span>
            <span className="syntax-punctuation">{' }'}</span>
            <span className="syntax-operator">;</span>
          </motion.div>

          <div className="h-4" />

          {/* Education entries */}
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
              className="mb-5"
            >
              <div className={`p-4 rounded-md transition-all duration-200 ${
                isDark
                  ? 'bg-[#252526] border border-ide-border hover:border-accent-green/30'
                  : 'bg-[#f8f8f8] border border-light-border hover:border-emerald-300'
              }`}>
                {/* Const declaration */}
                <div>
                  <span className="syntax-keyword">const</span>
                  <span className="syntax-variable"> {edu.degree.includes('Master') ? 'masters' : 'bachelors'}</span>
                  <span className="syntax-operator">: </span>
                  <span className="syntax-type">Degree</span>
                  <span className="syntax-operator">{' = '}</span>
                  <span className="syntax-punctuation">{'{'}</span>
                </div>

                <div className="pl-8">
                  <div>
                    <span className="syntax-property">degree</span>
                    <span className="syntax-operator">: </span>
                    <span className="syntax-string">'{edu.degree}'</span>
                    <span className="syntax-operator">,</span>
                  </div>
                  <div>
                    <span className="syntax-property">institution</span>
                    <span className="syntax-operator">: </span>
                    <span className="syntax-string">'{edu.institution}, {edu.location}'</span>
                    <span className="syntax-operator">,</span>
                  </div>
                  <div>
                    <span className="syntax-property">period</span>
                    <span className="syntax-operator">: </span>
                    <span className="syntax-string">'{edu.period}'</span>
                    <span className="syntax-operator">,</span>
                  </div>
                  <div>
                    <span className="syntax-property">score</span>
                    <span className="syntax-operator">: </span>
                    <span className="syntax-number">{edu.score}</span>
                    <span className="syntax-operator">,</span>
                  </div>
                </div>

                <div>
                  <span className="syntax-punctuation">{'};'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
