import React from 'react';
import { FileType } from '../types';

interface EditorProps {
  code: string;
  type: FileType;
}

export const Editor: React.FC<EditorProps> = ({ code, type }) => {
  // Simple syntax highlighting simulation using regex replacement for display
  // In a real app, use prismjs or monaco-editor. 
  // Here we just render raw for performance and simplicity in this specific format constraint, 
  // relying on font and color to convey "code".
  
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#252526] px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] text-gray-300 text-sm border-t-2 border-blue-500 rounded-t">
          <span className="opacity-70">
             {type === FileType.TS ? 'logic.ts' : type === FileType.TSX ? 'Component.tsx' : 'data.json'}
          </span>
          <button className="ml-2 hover:text-white">&times;</button>
        </div>
      </div>
      
      {/* Code Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed">
        <pre className="text-gray-300">
            {code.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                    <span className="table-cell text-right pr-4 text-gray-600 select-none w-8">{i + 1}</span>
                    <span className="table-cell whitespace-pre-wrap">{line}</span>
                </div>
            ))}
        </pre>
      </div>
      
      {/* Status Bar */}
      <div className="bg-blue-600 text-white text-xs px-3 py-1 flex justify-between items-center">
        <div className="flex gap-4">
            <span>master*</span>
            <span>0 errors</span>
        </div>
        <div className="flex gap-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>{type}</span>
        </div>
      </div>
    </div>
  );
};