/* ================================================================
   components/StatusBar.tsx
   VS Code-style status bar at the bottom
   ================================================================ */

interface StatusBarProps {
  activeFile: string;
  isDark: boolean;
  lineCount: number;
}

export default function StatusBar({ activeFile, isDark }: StatusBarProps) {
  return (
    <div
      className={`flex items-center justify-between px-3 text-[11px] font-sans select-none ${
        isDark ? 'bg-ide-statusbar text-white' : 'bg-light-statusbar text-white'
      }`}
      style={{ height: '22px' }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="text-[10px]">⎇</span> main
        </span>
        <span className="flex items-center gap-1">
          <span className="status-dot online" />
          <span>0 errors</span>
        </span>
        <span>0 warnings</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{activeFile.endsWith('.tsx') ? 'TypeScript React' : activeFile.endsWith('.json') ? 'JSON' : activeFile.endsWith('.md') ? 'Markdown' : 'Plain Text'}</span>
        <span className="flex items-center gap-1">
          <span className="text-[10px]">✓</span> Prettier
        </span>
      </div>
    </div>
  );
}
