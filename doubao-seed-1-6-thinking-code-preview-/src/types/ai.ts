// AI Agent Type Definitions

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AIRequest {
  prompt: string;
  type: 'code' | 'text' | 'analysis';
  parameters?: Record<string, any>;
}

export interface AIResponse {
  id: string;
  content: string;
  type: 'code' | 'text' | 'analysis';
  confidence?: number;
  timestamp: Date;
}

export interface CodeSuggestion {
  code: string;
  explanation: string;
  language: string;
}

export interface AIAgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}
