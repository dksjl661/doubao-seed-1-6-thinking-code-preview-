export interface SelectedFile {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  status: string;
  statusText: string;
  statusClass: string;
}

export interface UploadedFile {
  filename: string;
  size: number;
  createdAt: string;
  modifiedAt: string;
}

export interface Message {
  id: number;
  type: 'success' | 'error' | 'info';
  text: string;
  details?: string;
  duration?: number;
  animation?: string;
}