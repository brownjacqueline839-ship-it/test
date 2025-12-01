import React, { useState, useEffect, useRef } from 'react';
import { FileType, Message } from '../types';
import { FILE_INFO } from '../constants';
import { explainConcept, generateExample } from '../services/geminiService';
import { Send, Bot, User, Loader2, Sparkles, Monitor, Terminal, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AssistantPanelProps {
  activeType: FileType;
  onUpdateCode: (code: string) => void;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({ activeType, onUpdateCode }) => {
  const info = FILE_INFO[activeType];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clear chat when file type changes
  useEffect(() => {
    setMessages([{
      role: 'model',
      text: `Hello! I'm your dev assistant. Ask me anything about **${info.extension}** files or how to open them.`
    }]);
  }, [activeType, info.extension]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await explainConcept(activeType, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateExample = async () => {
    setIsLoading(true);
    try {
      const code = await generateExample(activeType, "A complex example showcasing key features");
      onUpdateCode(code);
      setMessages(prev => [...prev, { role: 'model', text: "I've updated the editor with a new example for you!" }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800 w-96">
      {/* File Info Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-800/20">
        <h2 className="text-2xl font-bold text-white mb-2">{info.fullName}</h2>
        <p className="text-gray-400 text-sm mb-4">{info.description}</p>
        
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How to Open</h3>
          <ul className="space-y-2">
            {info.howToOpen.map((tool, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                {tool.toLowerCase().includes('browser') ? <Globe size={14} className="text-green-400" /> : 
                 tool.toLowerCase().includes('terminal') ? <Terminal size={14} className="text-yellow-400" /> :
                 <Monitor size={14} className="text-blue-400" />}
                {tool}
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={handleGenerateExample}
          disabled={isLoading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors text-sm font-medium"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          Generate New Example
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
        <div className="p-4 border-b border-gray-800">
           <h3 className="text-sm font-semibold text-gray-400">AI Assistant</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-3 rounded-lg max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-100' : 'bg-gray-800 text-gray-200'}`}>
                 <ReactMarkdown 
                    components={{
                        p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                        code: ({node, ...props}) => <code className="bg-black/30 px-1 rounded text-xs font-mono" {...props} />
                    }}
                 >
                    {msg.text}
                 </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                    <Loader2 className="animate-spin text-gray-400" size={16} />
                </div>
             </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask about ${activeType}...`}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};