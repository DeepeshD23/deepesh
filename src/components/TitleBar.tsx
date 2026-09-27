/* ================================================================
   components/TitleBar.tsx
   VS Code-style title bar with window controls & menu items
   ================================================================ */
import { useState } from 'react';

interface TitleBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function TitleBar({ isDark, onToggleTheme }: TitleBarProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const menus = ['File', 'Edit', 'View', 'Terminal', 'Help'];

  return (
    <div
      className={`flex items-center justify-between px-2 select-none z-50 ${
        isDark ? 'bg-ide-titlebar text-[#cccccc]' : 'bg-light-titlebar text-[#333]'
      }`}
      style={{ height: '32px', WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: Menu items */}
      <div className="flex items-center gap-0" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* VS Code icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-accent-green font-mono font-bold text-sm">{'>'}_</span>
        </div>

        {menus.map((menu) => (
          <button
            key={menu}
            className={`px-2 py-1 text-[11px] font-sans rounded-sm transition-colors duration-100 ${
              menuOpen === menu
                ? isDark ? 'bg-[#505050]' : 'bg-[#c8c8c8]'
                : isDark ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#d4d4d4]'
            }`}
            onClick={() => setMenuOpen(menuOpen === menu ? null : menu)}
            onMouseEnter={() => menuOpen && setMenuOpen(menu)}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Center: Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-[11px] font-sans opacity-60">
        Deepesh Dagar — Portfolio
      </div>

      {/* Right: Window controls + theme toggle */}
      <div className="flex items-center gap-0" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className={`w-8 h-8 flex items-center justify-center text-xs transition-colors ${
            isDark ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#d4d4d4]'
          }`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀' : '🌙'}
        </button>

        {/* Window buttons (decorative) */}
        <button className={`w-12 h-8 flex items-center justify-center text-[11px] ${
          isDark ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#d4d4d4]'
        }`}>
          ─
        </button>
        <button className={`w-12 h-8 flex items-center justify-center text-[11px] ${
          isDark ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#d4d4d4]'
        }`}>
          □
        </button>
        <button className="w-12 h-8 flex items-center justify-center text-[11px] hover:bg-[#e81123] hover:text-white">
          ✕
        </button>
      </div>
    </div>
  );
}
