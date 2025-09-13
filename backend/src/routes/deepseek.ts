import { Router, Request, Response } from 'express';
import { DeepseekService } from '../services/deepseekService.js';
import { z } from 'zod';
import { createLogger } from '../config/logger.js';

const router = Router();
let deepseekService: DeepseekService | null = null;
const logger = createLogger();

// Lazy initialization of DeepseekService
function getDeepseekService(): DeepseekService {
  if (!deepseekService) {
    deepseekService = new DeepseekService();
  }
  return deepseekService;
}

// Request validation schemas
const codeGenerationSchema = z.object({
  prompt: z.string().min(1).max(5000),
  language: z.enum(['kotlin', 'java', 'xml', 'javascript', 'typescript']).default('kotlin'),
  context: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner')
});

const codeExplanationSchema = z.object({
  code: z.string().min(1).max(10000),
  language: z.enum(['kotlin', 'java', 'xml', 'javascript', 'typescript']),
  level: z.enum(['simple', 'detailed', 'expert']).default('simple')
});

const errorAnalysisSchema = z.object({
  error: z.string().min(1).max(2000),
  code: z.string().min(1).max(10000),
  language: z.enum(['kotlin', 'java', 'xml', 'javascript', 'typescript'])
});

// Generate code from natural language
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, language, context, difficulty } = codeGenerationSchema.parse(req.body);
    
    logger.info(`Code generation request: ${language} - ${difficulty} level`);
    
    const result = await getDeepseekService().generateCode({
      prompt,
      language,
      context,
      difficulty
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    logger.error('Code generation failed:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Code generation failed'
      });
    }
  }
});

// Explain existing code
router.post('/explain', async (req: Request, res: Response) => {
  try {
    const { code, language, level } = codeExplanationSchema.parse(req.body);
    
    logger.info(`Code explanation request: ${language} - ${level} level`);
    
    const result = await getDeepseekService().explainCode({
      code,
      language,
      level
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    logger.error('Code explanation failed:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Code explanation failed'
      });
    }
  }
});

// Analyze and fix errors
router.post('/analyze-error', async (req: Request, res: Response) => {
  try {
    const { error, code, language } = errorAnalysisSchema.parse(req.body);
    
    logger.info(`Error analysis request: ${language}`);
    
    const result = await getDeepseekService().analyzeError({
      error,
      code,
      language
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: unknown) {
    logger.error('Error analysis failed:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Error analysis failed'
      });
    }
  }
});

// Get code suggestions/completions
router.post('/complete', async (req: Request, res: Response) => {
  try {
    const { code, language, cursorPosition } = req.body;
    
    logger.info(`Code completion request: ${language}`);
    
    const result = await getDeepseekService().getCodeCompletion({
      code,
      language,
      cursorPosition
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Code completion failed:', error);
    res.status(500).json({
      success: false,
      error: 'Code completion failed'
    });
  }
});

export { router as deepseekRoutes };
