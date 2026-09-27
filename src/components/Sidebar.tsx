/* ================================================================
   components/Sidebar.tsx
   VS Code-style file explorer sidebar with collapsible file tree
   ================================================================ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fileTree, type FileTreeNode } from '../data/portfolioData';

interface SidebarProps {
  activeFile: string;
  onFileClick: (sectionId: string, fileName: string) => void;
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
}

/* Recursive file/folder renderer */
function TreeNode({
  node,
  depth,
  activeFile,
  onFileClick,
  isDark,
}: {
  node: FileTreeNode;
  depth: number;
  activeFile: string;
  onFileClick: (sectionId: string, fileName: string) => void;
  isDark: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const paddingLeft = 12 + depth * 16;

  /* Color coding for file icons based on language/extension */
  const getFileIconColor = (lang?: string) => {
    switch (lang) {
      case 'tsx': return 'text-[#519aba]';
      case 'ts': return 'text-[#519aba]';
      case 'json': return 'text-[#cbcb41]';
      case 'md': return 'text-[#519aba]';
      default: return 'text-[#858585]';
    }
  };

  if (node.type === 'folder') {
    return (
      <div>
        <button
          className={`w-full flex items-center gap-1 py-[3px] text-[13px] font-sans transition-colors group ${
            isDark
              ? 'text-[#cccccc] hover:bg-[#2a2d2e]'
              : 'text-[#333] hover:bg-[#e8e8e8]'
          }`}
          style={{ paddingLeft }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-[10px] transition-transform" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
          <span className="text-sm">{isExpanded ? '📂' : '📁'}</span>
          <span className="font-semibold">{node.name}</span>
        </button>
        <AnimatePresence>
          {isExpanded && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {node.children.map((child, i) => (
                <TreeNode
                  key={`${child.name}-${i}`}
                  node={child}
                  depth={depth + 1}
                  activeFile={activeFile}
                  onFileClick={onFileClick}
                  isDark={isDark}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const isActive = activeFile === node.name;

  return (
    <button
      className={`w-full flex items-center gap-2 py-[3px] text-[13px] font-sans transition-colors ${
        isActive
          ? isDark
            ? 'bg-[#37373d] text-white'
            : 'bg-[#d6ebff] text-[#1e1e1e]'
          : isDark
            ? 'text-[#cccccc] hover:bg-[#2a2d2e]'
            : 'text-[#333] hover:bg-[#e8e8e8]'
      }`}
      style={{ paddingLeft: paddingLeft + 14 }}
      onClick={() => node.sectionId && onFileClick(node.sectionId, node.name)}
    >
      <span className={`text-sm ${getFileIconColor(node.language)}`}>
        {node.icon || '📄'}
      </span>
      <span>{node.name}</span>
    </button>
  );
}

export default function Sidebar({ activeFile, onFileClick, isDark, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`flex flex-col overflow-hidden z-40 ${
          isDark
            ? 'bg-ide-sidebar border-r border-ide-border'
            : 'bg-light-sidebar border-r border-light-border'
        } ${
          /* Mobile: sliding panel / Desktop: always visible */
          isOpen ? 'fixed md:relative left-0 top-0 h-full' : 'hidden md:flex'
        }`}
        style={{ width: '220px', minWidth: '220px' }}
      >
        {/* Section header */}
        <div
          className={`flex items-center justify-between px-4 py-2 text-[11px] font-sans uppercase tracking-wider ${
            isDark ? 'text-[#bbbbbb]' : 'text-[#6f6f6f]'
          }`}
        >
          <span>Explorer</span>
          <button className="md:hidden text-lg" onClick={onClose}>✕</button>
        </div>

        {/* File tree */}
        <div className="flex-1 overflow-y-auto">
          {fileTree.map((node, i) => (
            <TreeNode
              key={`${node.name}-${i}`}
              node={node}
              depth={0}
              activeFile={activeFile}
              onFileClick={onFileClick}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Outline section (collapsed) */}
        <div className={`border-t px-4 py-2 text-[11px] font-sans uppercase tracking-wider ${
          isDark ? 'border-ide-border text-[#bbbbbb]' : 'border-light-border text-[#6f6f6f]'
        }`}>
          <span>Outline</span>
        </div>

        {/* Timeline section (collapsed) */}
        <div className={`border-t px-4 py-2 text-[11px] font-sans uppercase tracking-wider ${
          isDark ? 'border-ide-border text-[#bbbbbb]' : 'border-light-border text-[#6f6f6f]'
        }`}>
          <span>Timeline</span>
        </div>
      </motion.aside>
    </>
  );
}
