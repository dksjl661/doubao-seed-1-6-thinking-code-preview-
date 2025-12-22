import { AIRequest, AIResponse, CodeSuggestion, Message } from '../types/ai';

// AI Agent Service
class AIAgentService {
  private readonly config = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
  };

  // Mock AI responses for demonstration
  private generateMockResponse(prompt: string, type: string): string {
    const responses: Record<string, string[]> = {
      code: [
        `// TypeScript code suggestion based on your request\nfunction calculateTotal(items: number[]): number {\n  return items.reduce((sum, item) => sum + item, 0);\n}\n\n// This function safely calculates the total of numeric arrays with type checking`,
        `// React component example\nimport React from 'react';\n\ninterface Props {\n  title: string;\n  count: number;\n}\n\nconst Counter: React.FC<Props> = ({ title, count }) => {\n  return (\n    <div>\n      <h2>{title}</h2>\n      <p>Count: {count}</p>\n    </div>\n  );\n};\n\nexport default Counter;`,
        `// Advanced TypeScript type definitions\ntype AsyncResult<T> = Promise<{ data: T; error?: never } | { data?: never; error: string }>;\n\n// Usage example:\nasync function fetchData(): AsyncResult<string> {\n  try {\n    const data = await fetch('/api/data').then(r => r.text());\n    return { data };\n  } catch (e) {\n    return { error: 'Failed to fetch' };\n  }\n}`
      ],
      text: [
        "I understand your request! Based on my analysis, I'd recommend focusing on user experience and clean code architecture. Remember to follow TypeScript best practices for type safety and maintainability.",
        "That's an interesting question! In modern web development, React + TypeScript has become the standard for building scalable applications. The key benefits include excellent type checking, better developer experience, and improved code maintainability.",
        "Great point! When working with AI agents, it's important to consider both performance and accuracy. Mock implementations help with development, but in production you'd want to integrate with real AI services like OpenAI, Anthropic, or custom models."
      ],
      analysis: [
        "Analysis Complete: Your request shows strong understanding of modern development practices. The key patterns identified are:\n1. Type-safe component architecture\n2. Clean service layer separation\n3. Proper interface definitions\n\nRecommendations: Consider adding more comprehensive error handling and unit tests for production readiness.",
        "Technical Analysis: The code patterns you're exploring align with industry standards. I notice you're focusing on:\n- Modular component design\n- Type-safe API interactions\n- Clean architecture principles\n\nThese are all excellent choices for building maintainable applications."
      ]
    };

    const typeResponses = responses[type as keyof typeof responses] || responses.text;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  }

  // Send request to AI agent
  async sendRequest(request: AIRequest): Promise<AIResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    return {
      id: `resp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: this.generateMockResponse(request.prompt, request.type),
      type: request.type,
      confidence: 0.95,
      timestamp: new Date()
    };
  }

  // Get code suggestions specifically
  async getCodeSuggestion(prompt: string, language: string = 'typescript'): Promise<CodeSuggestion> {
    const response = await this.sendRequest({
      prompt: `${prompt} (language: ${language})`,
      type: 'code'
    });

    return {
      code: response.content.split('//')[0].trim(),
      explanation: response.content,
      language
    };
  }

  // Create message format for chat interface
  async generateChatResponse(userMessage: string): Promise<Message> {
    const response = await this.sendRequest({
      prompt: userMessage,
      type: this.determineRequestType(userMessage)
    });

    return {
      id: response.id,
      content: response.content,
      sender: 'ai',
      timestamp: response.timestamp
    };
  }

  // Determine request type from user input
  private determineRequestType(message: string): 'code' | 'text' | 'analysis' {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('code') || lowerMessage.includes('function') || lowerMessage.includes('component') || lowerMessage.includes('typescript')) {
      return 'code';
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('analysis') || lowerMessage.includes('review')) {
      return 'analysis';
    }

    return 'text';
  }
}

// Export singleton instance
export const aiAgentService = new AIAgentService();
