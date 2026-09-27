/* ================================================================
   components/ActivityBar.tsx
   VS Code-style left activity bar with icon buttons
   ================================================================ */

interface ActivityBarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  isDark: boolean;
}

const activities = [
  { id: 'explorer', icon: '📁', label: 'Explorer', section: '' },
  { id: 'search', icon: '🔍', label: 'Search', section: '' },
  { id: 'git', icon: '⎇', label: 'Source Control', section: '' },
  { id: 'extensions', icon: '⊞', label: 'Extensions', section: '' },
];

export default function ActivityBar({ isDark }: ActivityBarProps) {
  return (
    <div
      className={`hidden md:flex flex-col items-center py-1 ${
        isDark ? 'bg-ide-activitybar border-r border-ide-border' : 'bg-light-activitybar border-r border-light-border'
      }`}
      style={{ width: '48px' }}
    >
      {activities.map((activity, idx) => (
        <button
          key={activity.id}
          className={`w-12 h-12 flex items-center justify-center text-lg transition-all duration-150 relative group ${
            idx === 0
              ? isDark
                ? 'text-white border-l-2 border-white'
                : 'text-white border-l-2 border-white'
              : isDark
                ? 'text-[#858585] hover:text-white border-l-2 border-transparent'
                : 'text-[#858585] hover:text-white border-l-2 border-transparent'
          }`}
          title={activity.label}
        >
          {activity.icon}
          {/* Tooltip */}
          <span className="absolute left-full ml-2 px-2 py-1 bg-[#252526] text-[11px] text-white rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-[#454545]">
            {activity.label}
          </span>
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <button
        className={`w-12 h-12 flex items-center justify-center text-lg transition-colors ${
          isDark ? 'text-[#858585] hover:text-white' : 'text-[#858585] hover:text-white'
        }`}
        title="Profile"
      >
        👤
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center text-lg transition-colors ${
          isDark ? 'text-[#858585] hover:text-white' : 'text-[#858585] hover:text-white'
        }`}
        title="Settings"
      >
        ⚙
      </button>
    </div>
  );
}
