/* ================================================================
   components/sections/AboutSection.tsx
   About me section rendered as a code-commented JSDoc block
   ================================================================ */
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';

interface AboutSectionProps {
  isDark: boolean;
}

export default function AboutSection({ isDark }: AboutSectionProps) {
  const lines = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <section id="about" className="min-h-[60vh] relative">
      <div className="flex h-full">
        {/* Line gutter */}
        <div className={`hidden sm:flex flex-col pt-4 select-none ${
          isDark ? 'bg-ide-panel' : 'bg-light-panel'
        }`}>
          {lines.map((n) => (
            <div key={n} className="line-number">{n}</div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 pt-4 pl-4 code-content overflow-y-auto pb-8">
          {/* File header comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="syntax-comment">{'/**'}</div>
            <div className="syntax-comment">{' * @file    About.tsx'}</div>
            <div className="syntax-comment">{' * @summary Who I am and what I build'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-3" />

          {/* Interface definition */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="syntax-keyword">interface</span>
            <span className="syntax-type"> AboutMe </span>
            <span className="syntax-punctuation">{'{'}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="pl-8"
          >
            <div>
              <span className="syntax-property">summary</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-type">string</span>
              <span className="syntax-operator">;</span>
            </div>
            <div>
              <span className="syntax-property">focus</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-type">string[]</span>
              <span className="syntax-operator">;</span>
            </div>
            <div>
              <span className="syntax-property">passion</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-type">string</span>
              <span className="syntax-operator">;</span>
            </div>
          </motion.div>

          <div>
            <span className="syntax-punctuation">{'}'}</span>
          </div>

          <div className="h-3" />

          {/* Const with actual content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="syntax-keyword">const</span>
            <span className="syntax-variable"> aboutDeepesh</span>
            <span className="syntax-operator">: </span>
            <span className="syntax-type">AboutMe</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-punctuation">{'{'}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pl-8"
          >
            {/* Summary as multi-line string */}
            <div>
              <span className="syntax-property">summary</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">`</span>
            </div>
            <div className="pl-4">
              {personalInfo.summary.split('\n').map((line, i) => (
                <div key={i} className="syntax-string leading-relaxed">
                  {line.trim()}
                </div>
              ))}
            </div>
            <div>
              <span className="syntax-string">`</span>
              <span className="syntax-operator">,</span>
            </div>

            <div className="h-2" />

            {/* Focus areas */}
            <div>
              <span className="syntax-property">focus</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-punctuation">[</span>
            </div>
            <div className="pl-4">
              {[
                'Scalable Web Applications',
                'RESTful API Design',
                'Real-time Systems (WebSockets)',
                'Database Optimization',
                'Clean Architecture',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                >
                  <span className="syntax-string">'{item}'</span>
                  <span className="syntax-operator">,</span>
                </motion.div>
              ))}
            </div>
            <div>
              <span className="syntax-punctuation">]</span>
              <span className="syntax-operator">,</span>
            </div>

            <div className="h-2" />

            {/* Passion */}
            <div>
              <span className="syntax-property">passion</span>
              <span className="syntax-operator">: </span>
              <span className="syntax-string">'Building products that solve real problems, not just code that compiles.'</span>
              <span className="syntax-operator">,</span>
            </div>
          </motion.div>

          <div>
            <span className="syntax-punctuation">{'};'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
