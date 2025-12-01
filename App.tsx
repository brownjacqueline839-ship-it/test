import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { AssistantPanel } from './components/AssistantPanel';
import { FileType } from './types';
import { FILE_INFO } from './constants';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeType, setActiveType] = useState<FileType>(FileType.TS);
  const [currentCode, setCurrentCode] = useState<string>(FILE_INFO[FileType.TS].defaultCode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For mobile responsiveness

  useEffect(() => {
    // Reset code to default when changing type, unless we want to persist state per tab (simpler here to reset)
    setCurrentCode(FILE_INFO[activeType].defaultCode);
  }, [activeType]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-gray-300"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - responsive visibility */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar activeType={activeType} onSelect={(type) => {
            setActiveType(type);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            
          {/* Left/Top: Editor View */}
          <div className="flex-1 p-4 lg:p-8 flex flex-col min-h-[50vh] lg:h-full overflow-hidden bg-gray-950/50">
             <div className="mb-4 lg:pl-0 pl-12">
                 <h1 className="text-3xl font-bold text-white mb-2">
                     <span className="text-blue-500">{FILE_INFO[activeType].extension}</span> Viewer
                 </h1>
                 <p className="text-gray-400">
                    Previewing syntax and structure. Use the panel on the right (or below) to learn more.
                 </p>
             </div>
             <div className="flex-1 min-h-0">
                 <Editor code={currentCode} type={activeType} />
             </div>
          </div>

          {/* Right/Bottom: Info & Assistant */}
          <div className="lg:w-96 border-t lg:border-t-0 border-gray-800 h-[50vh] lg:h-full lg:flex-shrink-0">
             <AssistantPanel activeType={activeType} onUpdateCode={setCurrentCode} />
          </div>

        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}