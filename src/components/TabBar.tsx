/* ================================================================
   components/TabBar.tsx
   VS Code-style tab bar with active/inactive tab states
   ================================================================ */
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  language: string;
  icon: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  isDark: boolean;
}

/* Color dot based on file type */
function getLangColor(lang: string): string {
  switch (lang) {
    case 'tsx': return '#519aba';
    case 'ts': return '#3178c6';
    case 'json': return '#cbcb41';
    case 'md': return '#519aba';
    default: return '#858585';
  }
}

export default function TabBar({ tabs, activeTab, onTabClick, onTabClose, isDark }: TabBarProps) {
  return (
    <div
      className={`flex items-end overflow-x-auto no-scrollbar ${
        isDark ? 'bg-[#252526]' : 'bg-[#ececec]'
      }`}
      style={{ height: '36px' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            className={`tab-item relative group ${isActive ? 'active' : ''}`}
            style={{
              backgroundColor: isActive
                ? isDark ? '#1e1e1e' : '#ffffff'
                : isDark ? '#2d2d2d' : '#ececec',
              color: isActive
                ? isDark ? '#ffffff' : '#333333'
                : isDark ? '#969696' : '#666666',
              borderTop: isActive ? '1px solid #4ec9b0' : '1px solid transparent',
            }}
            onClick={() => onTabClick(tab.id)}
            layout
            transition={{ duration: 0.15 }}
          >
            {/* File type dot */}
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getLangColor(tab.language) }}
            />

            {/* Tab label */}
            <span className="text-[12px] font-sans truncate max-w-[120px]">{tab.label}</span>

            {/* Close button */}
            <span
              className={`w-5 h-5 flex items-center justify-center rounded-sm text-[12px] transition-all ${
                isActive
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              } ${isDark ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#d4d4d4]'}`}
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
            >
              ✕
            </span>

            {/* Active bottom border (clear line) */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}
                layoutId="activeTabBorder"
              />
            )}
          </motion.button>
        );
      })}

      {/* Empty space fills rest */}
      <div className={`flex-1 border-b ${isDark ? 'bg-[#252526] border-[#252526]' : 'bg-[#ececec] border-[#ececec]'}`} />
    </div>
  );
}
