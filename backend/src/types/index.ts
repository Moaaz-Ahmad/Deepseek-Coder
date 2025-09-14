// Request interfaces
export interface CodeGenerationRequest {
  prompt: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface CodeExplanationRequest {
  code: string;
  language: string;
}

export interface ErrorAnalysisRequest {
  error: string;
  code: string;
  language: string;
}

export interface CodeCompletionRequest {
  code: string;
  language: string;
  cursor_position: number;
}

// Response interfaces
export interface CodeGenerationResponse {
  generated_code: string;
  explanation: string;
  best_practices: string[];
  examples?: string[];
}

export interface CodeExplanationResponse {
  explanation: string;
  key_concepts: string[];
  complexity_level: string;
  suggestions?: string[];
}

export interface ErrorAnalysisResponse {
  analysis: string;
  possible_solutions: string[];
  prevention_tips: string[];
  corrected_code?: string;
}

export interface CodeCompletionResponse {
  completions: string[];
  context: string;
}

// Health check response
export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
}

// Project interfaces
export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  files: ProjectFile[];
}

export interface ProjectFile {
  path: string;
  content: string;
  type: 'kotlin' | 'xml' | 'gradle' | 'manifest' | 'other';
}

// Error response
export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}