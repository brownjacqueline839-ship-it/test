import React from 'react';
import { FileType } from '../types';
import { FileJson, FileCode, FileType2 } from 'lucide-react';

interface SidebarProps {
  activeType: FileType;
  onSelect: (type: FileType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeType, onSelect }) => {
  const items = [
    { type: FileType.TS, label: 'TypeScript (.ts)', icon: FileCode },
    { type: FileType.TSX, label: 'React TypeScript (.tsx)', icon: FileType2 },
    { type: FileType.JSON, label: 'JSON (.json)', icon: FileJson },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded">DE</span>
          DevExplorer
        </h1>
        <p className="text-xs text-gray-500 mt-2">File Type Guide</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.type;
          return (
            <button
              key={item.type}
              onClick={() => onSelect(item.type)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800/50 p-3 rounded text-xs text-gray-500">
          Powered by Gemini 2.5
        </div>
      </div>
    </div>
  );
};