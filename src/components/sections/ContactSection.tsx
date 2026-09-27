/* ================================================================
   components/sections/ContactSection.tsx
   Contact section styled as a terminal with command output
   ================================================================ */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';

interface ContactSectionProps {
  isDark: boolean;
}

export default function ContactSection({ isDark }: ContactSectionProps) {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string; type: string }>>([]);

  /* Simple terminal command handler */
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = '';
    let type = 'output';

    switch (trimmed) {
      case 'email':
        output = `→ ${personalInfo.email}`;
        type = 'success';
        break;
      case 'phone':
        output = `→ ${personalInfo.phone}`;
        type = 'success';
        break;
      case 'linkedin':
        output = `→ ${personalInfo.linkedin}`;
        type = 'success';
        window.open(personalInfo.linkedin, '_blank');
        break;
      case 'github':
        output = `→ ${personalInfo.github}`;
        type = 'success';
        window.open(personalInfo.github, '_blank');
        break;
      case 'resume':
        output = '→ Opening resume...';
        type = 'success';
        window.open(personalInfo.resumeUrl, '_blank');
        break;
      case 'help':
        output = 'Available commands: email, phone, linkedin, github, resume, clear, help';
        type = 'output';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Command not found: ${trimmed}. Type "help" for available commands.`;
        type = 'error';
    }

    setTerminalHistory((prev) => [...prev, { cmd, output, type }]);
    setTerminalInput('');
  };

  return (
    <section id="contact" className="min-h-[50vh] relative">
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
            <div className="syntax-comment">{' * @file    Contact.tsx'}</div>
            <div className="syntax-comment">{' * @desc    Get in touch — interactive terminal below'}</div>
            <div className="syntax-comment">{' */'}</div>
          </motion.div>

          <div className="h-4" />

          {/* Contact info as code */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="syntax-keyword">const</span>
            <span className="syntax-variable"> contact</span>
            <span className="syntax-operator">{' = '}</span>
            <span className="syntax-punctuation">{'{'}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pl-8"
          >
            <div>
              <span className="syntax-property">email</span>
              <span className="syntax-operator">: </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="syntax-string hover:text-accent-green transition-colors underline decoration-dotted"
              >
                '{personalInfo.email}'
              </a>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">phone</span>
              <span className="syntax-operator">: </span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="syntax-string hover:text-accent-green transition-colors underline decoration-dotted"
              >
                '{personalInfo.phone}'
              </a>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">linkedin</span>
              <span className="syntax-operator">: </span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="syntax-string hover:text-accent-green transition-colors underline decoration-dotted"
              >
                'linkedin.com/in/deepesh-dagar'
              </a>
              <span className="syntax-operator">,</span>
            </div>
            <div>
              <span className="syntax-property">github</span>
              <span className="syntax-operator">: </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="syntax-string hover:text-accent-green transition-colors underline decoration-dotted"
              >
                'github.com/DeepeshD23'
              </a>
              <span className="syntax-operator">,</span>
            </div>
          </motion.div>

          <div>
            <span className="syntax-punctuation">{'};'}</span>
          </div>

          <div className="h-6" />

          {/* Interactive terminal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`rounded-lg overflow-hidden max-w-2xl ${
              isDark ? 'bg-[#0c0c0c] border border-ide-border' : 'bg-[#1e1e1e] border border-[#444]'
            }`}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[11px] text-[#969696] font-mono ml-2">
                deepesh@portfolio:~$ — bash
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 font-mono text-[13px] text-[#d4d4d4] min-h-[160px]">
              {/* Welcome message */}
              <div className="text-accent-comment mb-2">
                # Type a command: email, phone, linkedin, github, resume, help
              </div>

              {/* History */}
              {terminalHistory.map((entry, idx) => (
                <div key={idx} className="mb-1">
                  <div>
                    <span className="text-accent-green">❯ </span>
                    <span className="text-accent-yellow">{entry.cmd}</span>
                  </div>
                  <div className={
                    entry.type === 'error'
                      ? 'text-accent-red pl-4'
                      : entry.type === 'success'
                        ? 'text-accent-green pl-4'
                        : 'text-[#d4d4d4] pl-4'
                  }>
                    {entry.output}
                  </div>
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center">
                <span className="text-accent-green">❯ </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && terminalInput.trim()) {
                      handleCommand(terminalInput);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-accent-yellow font-mono text-[13px] ml-1 caret-accent-green"
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="animate-cursor-blink text-accent-green">█</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
