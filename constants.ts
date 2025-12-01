import { FileType, FileTypeInfo } from './types';

export const FILE_INFO: Record<FileType, FileTypeInfo> = {
  [FileType.TS]: {
    extension: '.ts',
    fullName: 'TypeScript File',
    description: 'A TypeScript file contains code written in TypeScript, a strict syntactical superset of JavaScript that adds optional static typing.',
    howToOpen: [
      'Visual Studio Code (Recommended)',
      'WebStorm',
      'Sublime Text',
      'Atom'
    ],
    icon: 'typescript',
    defaultCode: `// interface defining the shape of a User object
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const admin: User = {
  id: 1,
  name: "Alice",
  isAdmin: true
};

console.log(greet(admin));`
  },
  [FileType.TSX]: {
    extension: '.tsx',
    fullName: 'TypeScript JSX File',
    description: 'A TSX file is a TypeScript file that contains JSX syntax, commonly used with React to describe what the UI should look like.',
    howToOpen: [
      'Visual Studio Code (Recommended)',
      'WebStorm',
      'IntelliJ IDEA',
      'Vim (with plugins)'
    ],
    icon: 'react',
    defaultCode: `import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  const [count, setCount] = useState<number>(0);

  return (
    <button 
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => {
        setCount(c => c + 1);
        onClick();
      }}
    >
      {label} ({count})
    </button>
  );
};`
  },
  [FileType.JSON]: {
    extension: '.json',
    fullName: 'JavaScript Object Notation',
    description: 'JSON is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate.',
    howToOpen: [
      'Visual Studio Code',
      'Any Web Browser (Chrome, Firefox)',
      'Notepad / TextEdit',
      'Online JSON Viewers'
    ],
    icon: 'json',
    defaultCode: `{
  "project": "Demo App",
  "version": "1.0.0",
  "settings": {
    "theme": "dark",
    "notifications": true,
    "retryAttempts": 3
  },
  "contributors": [
    { "name": "John", "role": "Developer" },
    { "name": "Jane", "role": "Designer" }
  ]
}`
  }
};