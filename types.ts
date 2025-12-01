export enum FileType {
  TS = 'TS',
  TSX = 'TSX',
  JSON = 'JSON'
}

export interface FileTypeInfo {
  extension: string;
  fullName: string;
  description: string;
  howToOpen: string[];
  defaultCode: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}